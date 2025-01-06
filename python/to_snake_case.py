import os
import re

def to_snake_case(name):
    # Remove file extension
    name = os.path.splitext(name)[0]

    # Replace spaces and hyphens with underscores
    name = re.sub(r'[ -]', '_', name)

    # Remove any characters that are not alphanumeric or underscore
    name = re.sub(r'[^a-zA-Z0-9_]', '', name)

    # Convert to lowercase
    name = name.lower()

    # Replace multiple underscores with a single underscore
    name = re.sub(r'_+', '_', name)

    # Remove leading and trailing underscores
    name = name.strip('_')

    return name

# Get all files in the current directory
files = [f for f in os.listdir('.') if os.path.isfile(f)]

for file in files:
    # Get the file extension
    file_ext = os.path.splitext(file)[1]

    # Create the new filename
    new_name = to_snake_case(file) + file_ext

    # Rename the file
    try:
        os.rename(file, new_name)
        print(f"Renamed '{file}' to '{new_name}'")
    except OSError as e:
        print(f"Error renaming '{file}': {e}")
