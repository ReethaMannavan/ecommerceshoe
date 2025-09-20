from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Logo, Cart
from .serializers import LogoSerializer, CartSerializer

#homepage-navbar


class LogoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Logo.objects.all().order_by('-uploaded_at')  # latest first
    serializer_class = LogoSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    # Custom endpoint for latest logo
    @action(detail=False, methods=['get'])
    def latest(self, request):
        logo = self.get_queryset().first()  # get the newest logo
        if not logo:
            return Response({"image_url": None})
        serializer = self.get_serializer(logo)
        return Response(serializer.data)




class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def count(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response({"item_count": cart.item_count})





#heroslide
from rest_framework import viewsets, filters
from .models import HeroSlide
from .serializers import HeroSlideSerializer
from rest_framework.permissions import AllowAny

class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only viewset for hero slides. Frontend only needs list (and optionally retrieve).
    """
    serializer_class = HeroSlideSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created']
    ordering = ['order']

    def get_queryset(self):
        return HeroSlide.objects.filter(is_active=True).order_by('order', '-created')




#overview

from rest_framework import viewsets
from .models import Overview
from .serializers import OverviewSerializer

class OverviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Overview.objects.all()
    serializer_class = OverviewSerializer



#menucategories

from rest_framework import viewsets
from .models import Category, Brand, Offer, Product
from .serializers import CategorySerializer, BrandSerializer, OfferSerializer, ProductSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ProductDetailPageSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.all().order_by("name")
    serializer_class = BrandSerializer


class OfferViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    def get_queryset(self):
        """
        Returns products filtered by query params:
        - subitem (highest priority)
        - subcategory
        - category
        - brand
        - offer
        """
        queryset = Product.objects.all()

        # Get query params
        category_slug = self.request.query_params.get("category")
        subcategory_slug = self.request.query_params.get("subcategory")
        subitem_slug = self.request.query_params.get("subitem")
        brand_slug = self.request.query_params.get("brand")
        offer_slug = self.request.query_params.get("offer")

        # Filter logic
        if subitem_slug:
            queryset = queryset.filter(subitem__slug=subitem_slug)
        elif subcategory_slug:
            queryset = queryset.filter(subitem__subcategory__slug=subcategory_slug)
        elif category_slug:
            queryset = queryset.filter(subitem__subcategory__category__slug=category_slug)

        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)
        if offer_slug:
            queryset = queryset.filter(offers__slug=offer_slug)

        # Optional: order by name or id
        queryset = queryset.distinct()

    # Optional: order by id
        return queryset.order_by("id")

#productdescription

    @action(detail=True, methods=["get"], url_path="details")
    def product_details(self, request, slug=None):
        product = self.get_object()
        serializer = ProductDetailPageSerializer(product, context={"request": request})
        return Response(serializer.data)







#contact

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from .models import ContactInfo
from .serializers import ContactInfoSerializer, EnquirySerializer

class ContactInfoView(APIView):
    def get(self, request):
        contact = ContactInfo.objects.first()
        serializer = ContactInfoSerializer(contact, context={'request': request})
        return Response(serializer.data)


class EnquiryView(APIView):
    def post(self, request):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data["name"]
            email = serializer.validated_data["email"]
            phone = serializer.validated_data["phone"]
            message = serializer.validated_data["message"]

            # Mail to admin
            admin_subject = f"New Enquiry from {name}"
            admin_message = f"""
            Name: {name}
            Email: {email}
            Phone: {phone}
            Message: {message}
            """
            send_mail(
                admin_subject,
                admin_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.DEFAULT_FROM_EMAIL],  # host email
                fail_silently=False,
            )

            # Confirmation mail to user
            user_subject = "Thanks for contacting us!"
            user_message = f"Hi {name},\n\nThanks for reaching out. We will get back to you soon."
            send_mail(
                user_subject,
                user_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return Response({"message": "Enquiry sent successfully!"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#aboutpage
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AboutPage
from .serializers import AboutPageSerializer

class AboutPageView(APIView):
    def get(self, request):
        about_page = AboutPage.objects.first()
        serializer = AboutPageSerializer(about_page, context={'request': request})
        return Response(serializer.data)





#footer
from rest_framework import generics
from .models import FooterContactInfo, SocialMedia, Newsletter
from .serializers import FooterContactInfoSerializer, SocialMediaSerializer, NewsletterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings

# Get Contact Info
class FooterContactInfoView(generics.ListAPIView):
    queryset = FooterContactInfo.objects.all()
    serializer_class = FooterContactInfoSerializer


# Get Social Media
class SocialMediaView(generics.ListAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer


# Get Newsletter Content
class NewsletterView(generics.ListAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer


# Subscribe API
@api_view(["POST"])
def subscribe_newsletter(request):
    email = request.data.get("email")
    if email:
        send_mail(
            subject="Thanks for subscribing!",
            message="You have successfully subscribed to our newsletter.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )
        return Response({"message": "Subscription successful"}, status=201)
    return Response({"error": "Email is required"}, status=400)


from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response  # <-- Add this
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Please use POST to register."})





from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response  # <-- Add this

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def get(self, request, *args, **kwargs):
        return Response({"detail": "Please use POST to login."})

