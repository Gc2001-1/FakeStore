// js/services/storeService.js
app.service('StoreService', function($http) {
    
    // URLs de la API
    var apiUrl = 'https://fakestoreapi.com/products';
    var categoriesUrl = 'https://fakestoreapi.com/products/categories';
    
    // Obtener todos los productos
    this.getProducts = function() {
        return $http.get(apiUrl);
    };
    
    // Obtener productos por categoría
    this.getProductsByCategory = function(category) {
        return $http.get(apiUrl + '/category/' + category);
    };
    
    // Obtener todas las categorías
    this.getCategories = function() {
        return $http.get(categoriesUrl);
    };
    
    // --- FUNCIONES DE CARRITO ---
    
    // Obtener carrito desde localStorage
    this.getCarrito = function() {
        var carrito = localStorage.getItem('carritoFakeStore');
        return carrito ? JSON.parse(carrito) : [];
    };
    
    // Guardar carrito en localStorage
    this.guardarCarrito = function(carrito) {
        localStorage.setItem('carritoFakeStore', JSON.stringify(carrito));
    };
    
    // Limpiar carrito
    this.limpiarCarrito = function() {
        localStorage.removeItem('carritoFakeStore');
    };
    
    // Calcular total del carrito
    this.calcularTotal = function(carrito) {
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            total += carrito[i].precio * carrito[i].cantidad;
        }
        return total;
    };
});