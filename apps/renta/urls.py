# apps/renta/urls.py
from rest_framework.routers import DefaultRouter
from .views import (
    RentaViewSet,
    TipoPagoViewSet,
    EstadoViewSet,
    PagoViewSet,
    RentaProductoViewSet,
)

router = DefaultRouter()
router.register(r'rentas', RentaViewSet, basename='renta')
router.register(r'tipos-pago', TipoPagoViewSet, basename='tipopago')
router.register(r'estados', EstadoViewSet, basename='estado')
router.register(r'pagos', PagoViewSet, basename='pago')
router.register(r'renta-productos', RentaProductoViewSet, basename='rentaproducto')

urlpatterns = router.urls
