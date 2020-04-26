from MetadataDocument.views import MetadataView
from MetadataDocument.views import DocumentView
from MetadataDocument.views import CreateUserView

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'metadata', MetadataView)
router.register(r'document', DocumentView)
router.register(r'createuser', CreateUserView)