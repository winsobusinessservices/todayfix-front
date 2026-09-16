import sys

file_path = r'e:\demo-test\todayfix-backend\services\api\serializers.py'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """    def validate_cat_uuid(self, value):
        try:
            category = Category.objects.get(
                cat_uuid=value,
                is_active=True,
            )
        except Category.DoesNotExist:
            raise serializers.ValidationError(
                "Category not found."
            )

        self._category = category
        return value"""

replacement = """    def validate_cat_uuid(self, value):
        try:
            category = Category.objects.get(
                cat_uuid=value,
                is_active=True,
            )
        except Category.DoesNotExist:
            raise serializers.ValidationError(
                "Category not found."
            )

        self._category = category
        return value

    def validate_subCat_uuid(self, value):
        if value is None:
            return value

        try:
            subcategory = SubCategory.objects.get(
                subCat_uuid=value,
                is_active=True,
            )
        except SubCategory.DoesNotExist:
            raise serializers.ValidationError(
                "Subcategory not found."
            )
        self._subcategory = subcategory
        return value"""

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Patched serializers.py successfully.')
else:
    print('Target not found in serializers.py.')
