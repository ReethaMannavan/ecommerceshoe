from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import LogoViewSet, CartViewSet
from .views import FooterContactInfoView, SocialMediaView, NewsletterView, subscribe_newsletter
from .views import HeroSlideViewSet
from .views import OverviewViewSet
from .views import CategoryViewSet, BrandViewSet, OfferViewSet, ProductViewSet
from .views import ContactInfoView, EnquiryView
from .views import AboutPageView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

from .views import CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'logos', LogoViewSet, basename='logo')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'hero-slides', HeroSlideViewSet, basename='hero-slide')
router.register(r'overview', OverviewViewSet, basename="overview")
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'brands', BrandViewSet, basename='brands')
router.register(r'offers', OfferViewSet, basename='offers')
router.register(r'products', ProductViewSet, basename='products')


urlpatterns = [
    path('', include(router.urls)),
    path("footercontact/", FooterContactInfoView.as_view(), name="footer-contact-info"),
    path("social-media/", SocialMediaView.as_view(), name="social-media"),
    path("newsletter/", NewsletterView.as_view(), name="newsletter"),
    path("newsletter/subscribe/", subscribe_newsletter, name="subscribe-newsletter"),

    path("contact-info/", ContactInfoView.as_view(), name="contact-info"),
    path("enquiry/", EnquiryView.as_view(), name="enquiry"),

    path("about/", AboutPageView.as_view(), name="about-page"),


    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
