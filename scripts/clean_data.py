import re
import pandas as pd
from dateutil import parser
from bs4 import BeautifulSoup

# Read the original CSV files
content = pd.read_csv("data/raw/health-content.csv")
translations = pd.read_csv("data/raw/pidgin-translations.csv")

# Remove HTML tags and decode common HTML entities from text fields.
def clean_html(text):
    if pd.isna(text):
        return None

    text = str(text).replace("&amp;", "&")

    return BeautifulSoup(
        str(text),
        "html.parser"
    ).get_text(" ", strip=True)

# Standardize inconsistent topic names from the raw data.
def clean_topic(topic):
    if pd.isna(topic):
        return None

    topic = str(topic).strip().lower()

    topic_map = {
        "malaria": "Malaria",
        "malaria prevention": "Malaria",
        "maternal health": "Maternal Health",
        "nutrition": "Nutrition",
        "nutriton": "Nutrition",
        "hygiene": "Hygiene",
        "clean water": "Clean Water",
        "first aid": "First Aid",
        "immunisation": "Immunisation",
        "family planning": "Family Planning",
    }

    return topic_map.get(topic)

# Map standardized topic names to their database IDs.
TOPIC_IDS = {
    "Malaria": 1,
    "Maternal Health": 2,
    "Nutrition": 3,
    "First Aid": 4,
    "Hygiene": 5,
    "Clean Water": 6,
    "Immunisation": 7,
    "Family Planning": 8,
}

# Standardize content titles while preserving the original wording.
def clean_title(title):
    if pd.isna(title):
        return None

    title = clean_html(title).strip()
    title = title.capitalize()

    title = title.replace("ors", "ORS")

    return title

# Convert different raw data status values into published or draft.
def clean_status(status):
    if pd.isna(status):
        return "draft"

    status = str(status).strip().lower()

    if status in ["published", "true", "yes"]:
        return "published"

    return "draft"

# Convert the different date formats in the source data into dates.
def clean_date(value):
    if pd.isna(value):
        return None

    value = str(value).strip()

    # YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
    if re.match(r"^\d{4}-\d{2}-\d{2}", value):
        return pd.to_datetime(value).date()

    # DD/MM/YYYY
    if re.match(r"^\d{2}/\d{2}/\d{4}$", value):
        return pd.to_datetime(value, dayfirst=True).date()

    # Dates such as "Jan 2025"
    try:
        return parser.parse(value, default=parser.parse("2025-01-01")).date()
    except (ValueError, TypeError):
        return None

# Apply cleaning to content
content["topic"] = content["topic"].apply(clean_topic)
content["title"] = content["title"].apply(clean_title)
content["status"] = content["status"].apply(clean_status)
content["title"] = content["title"].apply(clean_html)
content["summary"] = content["summary"].apply(clean_html)
content["body"] = content["body"].apply(clean_html)
content["topic_id"] = content["topic"].map(TOPIC_IDS)
content["last_updated"] = content["last_updated"].apply(clean_date)


# Clean Pidgin translations
translations["language"] = translations["language"].str.strip().str.lower()

translations = translations.rename(
    columns={"language": "language_code"}
)

translations["title"] = translations["title"].apply(clean_html)
translations["body"] = translations["body"].apply(clean_html)


# Remove the source topic name because the database uses topic_id.
content = content.drop(columns=["topic"])

# Save the cleaned data for database import.
content.to_csv(
    "data/cleaned/cleaned_health-content.csv",
    index=False
)

translations.to_csv(
    "data/cleaned/cleaned_pidgin-translations.csv",
    index=False
)