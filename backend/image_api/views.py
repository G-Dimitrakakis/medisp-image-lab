import base64
from io import BytesIO

from PIL import Image, UnidentifiedImageError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def process_image(request):
    """Receive an uploaded image, convert it to grayscale, and return base64 JSON."""
    uploaded_file = request.FILES.get("image")
    if uploaded_file is None:
        return Response(
            {"error": "Please upload an image file using the 'image' field."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        grayscale_image = Image.open(uploaded_file).convert("L")
    except UnidentifiedImageError:
        return Response(
            {"error": "The uploaded file is not a valid image."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    output_buffer = BytesIO()
    grayscale_image.save(output_buffer, format="PNG")
    encoded_image = base64.b64encode(output_buffer.getvalue()).decode("utf-8")

    return Response({"image": encoded_image}, status=status.HTTP_200_OK)
