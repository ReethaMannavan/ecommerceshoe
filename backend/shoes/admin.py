from django.contrib import admin
from .models import Logo, Cart, CartItem

@admin.register(Logo)
class LogoAdmin(admin.ModelAdmin):
    list_display = ('id', 'uploaded_at')
    readonly_fields = ('uploaded_at',)


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item_count')
    inlines = [CartItemInline]

    def item_count(self, obj):
        return obj.item_count
    item_count.short_description = "Items"





#heroslide
from django.contrib import admin
from .models import HeroSlide
from django.utils.html import format_html

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'order', 'is_active', 'thumb')
    list_editable = ('order', 'is_active')
    fields = ('title', 'paragraph', 'image', 'thumb_preview', 'button_text', 'button_link', 'position', 'order', 'is_active')
    readonly_fields = ('thumb_preview',)

    def thumb(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;"/>', obj.image.url)
        return "-"
    thumb.short_description = 'Image'

    def thumb_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:200px;"/>', obj.image.url)
        return "No image"
    thumb_preview.short_description = 'Preview'


#overview

from django.contrib import admin
from .models import Overview, OverviewItem

class OverviewItemInline(admin.TabularInline):
    model = OverviewItem
    extra = 1
    fields = ("title", "image", "link")  # <-- show title in inline


@admin.register(Overview)
class OverviewAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle")
    inlines = [OverviewItemInline]

@admin.register(OverviewItem)
class OverviewItemAdmin(admin.ModelAdmin):
    list_display = ("overview", "link")






#megamenu

# from django.contrib import admin
# from .models import Category, SubCategory, SubItem, Brand, Offer, Product, Color


# class SubItemInline(admin.TabularInline):
#     model = SubItem
#     extra = 1
#     prepopulated_fields = {"slug": ("name",)}


# class SubCategoryInline(admin.TabularInline):
#     model = SubCategory
#     extra = 1
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(Category)
# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ("name", "slug")
#     prepopulated_fields = {"slug": ("name",)}
#     inlines = [SubCategoryInline]


# @admin.register(SubCategory)
# class SubCategoryAdmin(admin.ModelAdmin):
#     list_display = ("name", "category", "slug")
#     prepopulated_fields = {"slug": ("name",)}
#     inlines = [SubItemInline]


# @admin.register(SubItem)
# class SubItemAdmin(admin.ModelAdmin):
#     list_display = ("name", "subcategory", "slug")
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(Brand)
# class BrandAdmin(admin.ModelAdmin):
#     list_display = ("name", "slug")
#     prepopulated_fields = {"slug": ("name",)}


# @admin.register(Offer)
# class OfferAdmin(admin.ModelAdmin):
#     list_display = ("title", "slug")
#     prepopulated_fields = {"slug": ("title",)}


# @admin.register(Color)
# class ColorAdmin(admin.ModelAdmin):
#     list_display = ("name", "hex_code")


# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ("name", "price", "brand", "rating", "subitem")
#     list_filter = ("brand", "subitem__subcategory__category", "offers", "colors")
#     search_fields = ("name", "description")
#     prepopulated_fields = {"slug": ("name",)}


from django.contrib import admin
from .models import (
    Category, SubCategory, SubItem, Brand, Offer, Product, Color,
    ShoeSize, ProductDetail, Review, ProductImage
)

# Existing inlines
class SubItemInline(admin.TabularInline):
    model = SubItem
    extra = 1
    prepopulated_fields = {"slug": ("name",)}

class SubCategoryInline(admin.TabularInline):
    model = SubCategory
    extra = 1
    prepopulated_fields = {"slug": ("name",)}

# Product inlines
class ProductDetailInline(admin.TabularInline):
    model = ProductDetail
    extra = 1

class ProductReviewInline(admin.TabularInline):
    model = Review
    extra = 1

class ProductSizeInline(admin.TabularInline):
    model = Product.sizes.through
    extra = 1

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 6
    max_num = 6

# Category admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SubCategoryInline]

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [SubItemInline]

@admin.register(SubItem)
class SubItemAdmin(admin.ModelAdmin):
    list_display = ("name", "subcategory", "slug")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ("name", "hex_code")

@admin.register(ShoeSize)
class ShoeSizeAdmin(admin.ModelAdmin):
    list_display = ("size",)

# Product admin (only one!)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "brand", "rating", "subitem")
    list_filter = ("brand", "subitem__subcategory__category", "offers", "colors")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [
        ProductDetailInline,
        ProductReviewInline,
        ProductSizeInline,
        ProductImageInline
    ]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("reviewer_name", "product", "overall_rating", "created_at")
    list_filter = ("overall_rating",)
    search_fields = ("reviewer_name", "comment")







#aboutpage
from django.contrib import admin
from .models import AboutPage, Feature

class FeatureInline(admin.TabularInline):
    model = Feature
    extra = 1

@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    inlines = [FeatureInline]
    list_display = ("title",)



#Footer & contactpage

from django.contrib import admin
from .models import ContactInfo, FooterContactInfo, SocialMedia, Newsletter

# -------------------------
# Contact Page
# -------------------------
@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "email", "inquiry_phone", "query_phone", "timing")
    search_fields = ("title", "subtitle", "email")
    readonly_fields = ("id",)

# -------------------------
# Footer Contact Info
# -------------------------
@admin.register(FooterContactInfo)
class FooterContactInfoAdmin(admin.ModelAdmin):
    list_display = ("email", "landline", "whatsapp", "address")
    search_fields = ("email", "landline", "whatsapp")
    readonly_fields = ("id",)

# -------------------------
# Social Media
# -------------------------
@admin.register(SocialMedia)
class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ("name", "url")
    search_fields = ("name", "url")

# -------------------------
# Newsletter
# -------------------------
@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ("heading",)
    search_fields = ("heading", "subtext")
