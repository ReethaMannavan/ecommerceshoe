from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

#homepage-navbar

class Logo(models.Model):
    image = models.ImageField(upload_to='logos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Logo {self.id}"


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")

    def __str__(self):
        return f"{self.user.username}'s Cart"

    @property
    def item_count(self):
        return self.items.count()


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"





#heroslide


class HeroSlide(models.Model):
    POSITION_CHOICES = [
        ('left', 'Left'),
        ('right', 'Right'),
        ('center', 'Center'),
    ]

    title = models.CharField(max_length=200, blank=True)  # optional title
    paragraph = models.TextField(blank=True)
    image = models.ImageField(upload_to='hero_slides/')
    button_text = models.CharField(max_length=50, blank=True, default='Shop Now')
    button_link = models.CharField(
        max_length=255,
        help_text="Frontend route or URL (e.g. /category/men or /products/123)",
        blank=True
    )
    position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='left')
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created']

    def __str__(self):
        return f"{self.id} - {self.title or self.paragraph[:30]}"




#overview

class Overview(models.Model):
    title = models.CharField(max_length=255, default="Overview")
    description = models.TextField()
    subtitle = models.CharField(max_length=255, default="What are you looking for?")

    def __str__(self):
        return self.title


class OverviewItem(models.Model):
    overview = models.ForeignKey(Overview, related_name="items", on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to="overview/")
    link = models.CharField(max_length=255, help_text="React Router path or URL")

    def __str__(self):
        return f"{self.title} ({self.overview.title})"







#menucategories

from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)   # Womens, Mens, Kids
    slug = models.SlugField(blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    category = models.ForeignKey(Category, related_name="subcategories", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)

    class Meta:
        unique_together = ("category", "slug")  

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} → {self.name}"


class SubItem(models.Model):
    subcategory = models.ForeignKey(SubCategory, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)

    class Meta:
        unique_together = ("subcategory", "slug")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.subcategory.name} → {self.name}"


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Offer(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Color(models.Model):
    name = models.CharField(max_length=50)       # e.g. "Blue"
    hex_code = models.CharField(max_length=7)    # e.g. "#0000FF"

    def __str__(self):
        return self.name
    

class ShoeSize(models.Model):
    SIZE_CHOICES = [
        ("UK3", "UK 3"),
        ("UK4", "UK 4"),
        ("UK5", "UK 5"),
        ("UK6", "UK 6"),
        ("UK7", "UK 7"),
        ("UK8", "UK 8"),
        ("UK9", "UK 9"),
        ("UK10", "UK 10"),
        ("UK11", "UK 11"),
    ]
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)

    def __str__(self):
        return self.size


class ProductDetail(models.Model):
    product = models.ForeignKey("Product", related_name="details", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)       # e.g. "Material"
    value = models.CharField(max_length=255)       # e.g. "Leather"

    def __str__(self):
        return f"{self.product.name} - {self.title}: {self.value}"


class Review(models.Model):
    product = models.ForeignKey("Product", related_name="reviews", on_delete=models.CASCADE)
    
    reviewer_name = models.CharField(max_length=100)
    reviewer_location = models.CharField(max_length=100, blank=True, null=True)
    reviewer_image = models.ImageField(upload_to="reviewers/", blank=True, null=True)

    overall_rating = models.IntegerField(default=5)  # 1–5 stars
    fit = models.IntegerField(default=0)
    comfort = models.IntegerField(default=0)
    value_for_money = models.IntegerField(default=0)
    quality = models.IntegerField(default=0)

    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer_name} - {self.product.name}"



class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, null=True)   # NEW
    long_description = models.TextField(blank=True, null=True) 

    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/", blank=True, null=True)

    subitem = models.ForeignKey(SubItem, related_name="products", on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, related_name="products", on_delete=models.SET_NULL, null=True, blank=True)
    offers = models.ManyToManyField(Offer, related_name="products", blank=True)
    
    sizes = models.ManyToManyField(ShoeSize, related_name="products", blank=True)
    
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)  # NEW
    colors = models.ManyToManyField(Color, related_name="products", blank=True) # NEW

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name



class ProductImage(models.Model):
    product = models.ForeignKey("Product", related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/")
    order = models.PositiveIntegerField(default=0)  # optional: control display order

    class Meta:
        ordering = ["order"]  # ensures images are returned in order

    def __str__(self):
        return f"{self.product.name} - Image {self.id}"










#about
from django.db import models

class AboutPage(models.Model):
    title = models.CharField(max_length=200, default="About StepUp")
    description = models.TextField()

    mission_title = models.CharField(max_length=200, default="Our Mission")
    mission_description = models.TextField()

    # Images
    side_image = models.ImageField(upload_to="about/", null=True, blank=True)
    center_image = models.ImageField(upload_to="about/", null=True, blank=True)

    def __str__(self):
        return self.title


class Feature(models.Model):
    about_page = models.ForeignKey(AboutPage, related_name="features", on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title





#contact

from django.db import models

class ContactInfo(models.Model):
    title = models.CharField(max_length=100, default="Contact Us")
    subtitle = models.CharField(max_length=200, default="For Online Orders")
    inquiry_phone = models.CharField(max_length=15, blank=True, null=True)
    query_phone = models.CharField(max_length=15, blank=True, null=True)
    timing = models.CharField(max_length=100, default="10 AM - 7 PM")
    email = models.EmailField()
    image = models.ImageField(upload_to="contact/", blank=True, null=True)

    def __str__(self):
        return "Contact Info"






# footer

from django.db import models

class FooterContactInfo(models.Model):
    landline = models.CharField(max_length=20, blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return f"Contact Info - {self.email}"


class SocialMedia(models.Model):
    name = models.CharField(max_length=50)  # e.g., Facebook, Instagram
    icon = models.ImageField(upload_to="social_icons/")  # dynamic image
    url = models.URLField()

    def __str__(self):
        return self.name


class Newsletter(models.Model):
    heading = models.CharField(max_length=200, default="Lets stay in touch !")
    subtext = models.TextField(default="Sign up for exclusive offers, original stories, events and more.")
    subscribers = models.EmailField(blank=True, null=True)  # store emails (optional)

    def __str__(self):
        return "Newsletter Section"
