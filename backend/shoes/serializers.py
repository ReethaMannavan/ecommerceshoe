from rest_framework import serializers
from .models import Logo, Cart, CartItem


#homepage- navbar



class LogoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Logo
        fields = ['image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None




class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product_name', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'item_count', 'items']




#heroslide
from rest_framework import serializers
from .models import HeroSlide

class HeroSlideSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # makes API return full URL to image

    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'paragraph', 'image', 'button_text', 'button_link', 'position', 'order', 'is_active']





#overview
from rest_framework import serializers
from .models import Overview, OverviewItem

class OverviewItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverviewItem
        fields = ["id", "title", "image", "link"]  # <-- added title


class OverviewSerializer(serializers.ModelSerializer):
    items = OverviewItemSerializer(many=True, read_only=True)

    class Meta:
        model = Overview
        fields = ["id", "title", "description", "subtitle", "items"]





#menucategories

# from rest_framework import serializers
# from .models import Category, SubCategory, SubItem, Brand, Offer, Product, Color


# class SubItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubItem
#         fields = ["id", "name", "slug"]


# class SubCategorySerializer(serializers.ModelSerializer):
#     items = SubItemSerializer(many=True, read_only=True)

#     class Meta:
#         model = SubCategory
#         fields = ["id", "name", "slug", "items"]


# class CategorySerializer(serializers.ModelSerializer):
#     subcategories = SubCategorySerializer(many=True, read_only=True)

#     class Meta:
#         model = Category
#         fields = ["id", "name", "slug", "subcategories"]


# class BrandSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Brand
#         fields = ["id", "name", "slug"]


# class OfferSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Offer
#         fields = ["id", "title", "slug"]


# class ColorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Color
#         fields = ["id", "name", "hex_code"]


# class ProductSerializer(serializers.ModelSerializer):
#     brand = BrandSerializer()
#     offers = OfferSerializer(many=True)
#     colors = ColorSerializer(many=True)  # NEW

#     class Meta:
#         model = Product
#         fields = [
#             "id", "name", "slug", "description",
#             "price", "image", "rating",
#             "brand", "offers", "colors"
#         ]




# #productdescriptionpage

# from rest_framework import serializers
# from .models import Product, ProductDetail, ShoeSize, Review, Brand, Offer, Color

# # Serializer for shoe sizes
# class ShoeSizeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ShoeSize
#         fields = ["id", "size"]

# # Serializer for product details
# class ProductDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductDetail
#         fields = ["id", "title", "value"]

# # Serializer for reviews
# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Review
#         fields = [
#             "id", "reviewer_name", "reviewer_location", "reviewer_image",
#             "overall_rating", "fit", "comfort", "value_for_money", "quality",
#             "comment", "created_at"
#         ]



# from rest_framework import serializers
# from .models import (
#     Product, ProductDetail, ShoeSize, Review, Brand, Offer, Color, ProductImage
# )

# class ProductImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductImage
#         fields = ["id", "image", "order"]

# class ProductDetailPageSerializer(serializers.ModelSerializer):
#     brand = BrandSerializer()
#     offers = OfferSerializer(many=True)
#     colors = ColorSerializer(many=True)
#     sizes = ShoeSizeSerializer(many=True)
#     details = ProductDetailSerializer(many=True)
#     reviews = ReviewSerializer(many=True)
#     images = ProductImageSerializer(many=True)  # NEW

#     class Meta:
#         model = Product
#         fields = [
#             "id", "name", "slug", "description", "long_description",
#             "price", "rating",
#             "brand", "offers", "colors", "sizes", "details", "reviews", "images"
#         ]



from rest_framework import serializers
from .models import (
    Category, SubCategory, SubItem, Brand, Offer, Product, Color,
    ShoeSize, ProductDetail, Review, ProductImage
)

# ----------------- Menu / Product List -----------------
class SubItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubItem
        fields = ["id", "name", "slug"]

class SubCategorySerializer(serializers.ModelSerializer):
    items = SubItemSerializer(many=True, read_only=True)

    class Meta:
        model = SubCategory
        fields = ["id", "name", "slug", "items"]

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "subcategories"]

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "slug"]

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ["id", "title", "slug"]

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "hex_code"]

class ShoeSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeSize
        fields = ["id", "size"]

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    offers = OfferSerializer(many=True)
    colors = ColorSerializer(many=True)
    sizes = ShoeSizeSerializer(many=True)        # add this
    subitem = SubItemSerializer()  

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description",
            "price", "image", "rating",
            "brand", "offers", "colors", "sizes", "subitem"
        ]

# ----------------- Product Description Page -----------------
class ShoeSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeSize
        fields = ["id", "size"]

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ["id", "title", "value"]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id", "reviewer_name", "reviewer_location", "reviewer_image",
            "overall_rating", "fit", "comfort", "value_for_money", "quality",
            "comment", "created_at"
        ]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "order"]

class ProductDetailPageSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True, required=False)
    offers = OfferSerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    sizes = ShoeSizeSerializer(many=True, read_only=True)
    details = ProductDetailSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)  # 6 images

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "long_description",
            "price", "rating",
            "brand", "offers", "colors", "sizes", "details", "reviews", "images"
        ]





#contact
from rest_framework import serializers
from .models import ContactInfo


class ContactInfoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ContactInfo
        fields = "__all__"
        

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None



class EnquirySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.RegexField(regex=r'^\d{10}$', error_messages={
        "invalid": "Phone number must be 10 digits."
    })
    message = serializers.CharField()

    def validate_name(self, value):
        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError("Name should contain only letters.")
        return value




# footer

from rest_framework import serializers
from .models import FooterContactInfo, SocialMedia, Newsletter

class FooterContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterContactInfo
        fields = "__all__"


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = "__all__"


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ["id", "heading", "subtext"]






#aboutpage
from rest_framework import serializers
from .models import AboutPage, Feature

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ["id", "title", "description"]

class AboutPageSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True, read_only=True)
    side_image_url = serializers.SerializerMethodField()
    center_image_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = [
            "id",
            "title",
            "description",
            "mission_title",
            "mission_description",
            "side_image",
            "center_image",
            "side_image_url",
            "center_image_url",
            "features",
        ]

    def get_side_image_url(self, obj):
        request = self.context.get('request')
        if obj.side_image and request:
            return request.build_absolute_uri(obj.side_image.url)
        return None

    def get_center_image_url(self, obj):
        request = self.context.get('request')
        if obj.center_image and request:
            return request.build_absolute_uri(obj.center_image.url)
        return None



from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["phone", "address"]

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "username", "email", "profile"]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile = instance.profile
        profile.phone = profile_data.get('phone', profile.phone)
        profile.address = profile_data.get('address', profile.address)
        profile.save()
        return instance



from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,
        style={'input_type': 'password'},
        error_messages={'min_length': 'Password must be at least 6 characters.'}
    )
    password2 = serializers.CharField(
        write_only=True, required=True,
        style={'input_type': 'password'}
    )
    phone = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "password2", "phone", "address")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email": "Email already exists."})
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError({"username": "Username already exists."})
        return attrs

    def create(self, validated_data):
        phone = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")

        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()

        # Update profile created by signal
        profile = user.profile
        profile.phone = phone
        profile.address = address
        profile.save()

        return user





from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["email"] = user.email
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
