from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES=True

def check_image(path):
    try:
        im = Image.open(path)
        return True
    except:
        return False
