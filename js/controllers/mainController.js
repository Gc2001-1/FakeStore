// js/controllers/mainController.js
app.controller('MainController', function($scope, StoreService) {
    
    // ========================================
    // VARIABLES INICIALES
    // ========================================
    $scope.productos = [];
    $scope.productosFiltrados = [];
    $scope.categorias = [];
    $scope.carrito = [];
    $scope.carritoTotal = 0;
    $scope.productoSeleccionado = {};
    $scope.categoriaSeleccionada = 'all';
    $scope.busquedaTexto = '';
    $scope.cargando = true;
    $scope.errorAPI = false;
    
    // ========================================
    // INICIALIZACIÓN - Cargar productos y carrito
    // ========================================
    $scope.inicializar = function() {
        // Cargar productos desde la API
        StoreService.getProducts()
            .then(function(response) {
                $scope.productos = response.data;
                $scope.productosFiltrados = response.data;
                $scope.cargando = false;
                console.log('Productos cargados:', $scope.productos.length);
            })
            .catch(function(error) {
                console.error('Error al cargar productos:', error);
                $scope.errorAPI = true;
                $scope.cargando = false;
            });
        
        // Cargar categorías
        StoreService.getCategories()
            .then(function(response) {
                $scope.categorias = response.data;
                console.log('Categorías cargadas:', $scope.categorias);
            })
            .catch(function(error) {
                console.error('Error al cargar categorías:', error);
            });
        
        // Cargar carrito desde localStorage
        $scope.carrito = StoreService.getCarrito();
        $scope.actualizarTotal();
    };
    
    // ========================================
    // FILTROS
    // ========================================
    
    // Filtrar por categoría
    $scope.filtrarPorCategoria = function() {
        if ($scope.categoriaSeleccionada === 'all') {
            // Mostrar todos los productos
            $scope.productosFiltrados = $scope.productos;
        } else {
            // Filtrar por categoría específica
            StoreService.getProductsByCategory($scope.categoriaSeleccionada)
                .then(function(response) {
                    $scope.productosFiltrados = response.data;
                    // Aplicar filtro de búsqueda si existe
                    if ($scope.busquedaTexto) {
                        $scope.aplicarFiltroBusqueda();
                    }
                })
                .catch(function(error) {
                    console.error('Error al filtrar por categoría:', error);
                });
        }
    };
    
    // Filtrar por texto de búsqueda
    $scope.aplicarFiltroBusqueda = function() {
        if (!$scope.busquedaTexto) {
            // Si no hay texto, mostrar según categoría
            $scope.filtrarPorCategoria();
            return;
        }
        
        var textoLower = $scope.busquedaTexto.toLowerCase();
        var productosBase = $scope.categoriaSeleccionada === 'all' 
            ? $scope.productos 
            : $scope.productosFiltrados;
        
        $scope.productosFiltrados = productosBase.filter(function(producto) {
            return producto.title.toLowerCase().includes(textoLower);
        });
    };
    
    // ========================================
    // MODAL DE DETALLES
    // ========================================
    
    $scope.verDetalles = function(producto) {
        $scope.productoSeleccionado = producto;
        $('#modalDetalles').modal('show');
    };
    
    // ========================================
    // CARRITO
    // ========================================
    
    // Agregar producto al carrito
    $scope.agregarAlCarrito = function() {
        if (!$scope.productoSeleccionado.id) {
            return;
        }
        
        // Buscar si el producto ya existe en el carrito
        var productoExistente = null;
        for (var i = 0; i < $scope.carrito.length; i++) {
            if ($scope.carrito[i].id === $scope.productoSeleccionado.id) {
                productoExistente = $scope.carrito[i];
                break;
            }
        }
        
        if (productoExistente) {
            // Si existe, aumentar cantidad
            productoExistente.cantidad++;
        } else {
            // Si no existe, agregar nuevo item
            var nuevoItem = {
                id: $scope.productoSeleccionado.id,
                title: $scope.productoSeleccionado.title,
                precio: $scope.productoSeleccionado.price,
                image: $scope.productoSeleccionado.image,
                cantidad: 1
            };
            $scope.carrito.push(nuevoItem);
        }
        
        // Guardar en localStorage
        StoreService.guardarCarrito($scope.carrito);
        
        // Actualizar total
        $scope.actualizarTotal();
        
        // Cerrar modal
        $('#modalDetalles').modal('hide');
        
        // Mostrar notificación
        $scope.mostrarNotificacion('¡Producto agregado al carrito!', 'success');
    };
    
    // Abrir modal del carrito
    $scope.abrirCarrito = function() {
        $('#modalCarrito').modal('show');
    };
    
    // Aumentar cantidad de un producto
    $scope.aumentarCantidad = function(item) {
        item.cantidad++;
        StoreService.guardarCarrito($scope.carrito);
        $scope.actualizarTotal();
    };
    
    // Disminuir cantidad de un producto
    $scope.disminuirCantidad = function(item) {
        if (item.cantidad > 1) {
            item.cantidad--;
            StoreService.guardarCarrito($scope.carrito);
            $scope.actualizarTotal();
        }
    };
    
    // Eliminar producto del carrito
    $scope.eliminarDelCarrito = function(item) {
        var index = $scope.carrito.indexOf(item);
        if (index > -1) {
            $scope.carrito.splice(index, 1);
            StoreService.guardarCarrito($scope.carrito);
            $scope.actualizarTotal();
            $scope.mostrarNotificacion('Producto eliminado del carrito', 'info');
        }
    };
    
    // Actualizar total del carrito
    $scope.actualizarTotal = function() {
        $scope.carritoTotal = StoreService.calcularTotal($scope.carrito);
    };
    
    // Limpiar carrito
    $scope.limpiarCarrito = function() {
        if ($scope.carrito.length === 0) {
            $scope.mostrarNotificacion('El carrito ya está vacío', 'info');
            return;
        }
        
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            $scope.carrito = [];
            StoreService.limpiarCarrito();
            $scope.actualizarTotal();
            $scope.mostrarNotificacion('Carrito vaciado', 'success');
        }
    };
    
    // Procesar pago
    $scope.procesarPago = function() {
        if ($scope.carrito.length === 0) {
            $scope.mostrarNotificacion('El carrito está vacío', 'warning');
            return;
        }
        
        // Simular proceso de pago
        $('#modalCarrito').modal('hide');
        
        // Mostrar mensaje de éxito
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.mostrarNotificacion('¡Pago exitoso! Gracias por tu compra.', 'success');
                
                // Limpiar carrito después del pago
                $scope.carrito = [];
                StoreService.limpiarCarrito();
                $scope.actualizarTotal();
            });
        }, 300);
    };
    
    // ========================================
    // NOTIFICACIONES (usando alerts mejorados)
    // ========================================
    
    $scope.mostrarNotificacion = function(mensaje, tipo) {
        // Tipos: success, info, warning, danger
        var alertClass = 'alert-' + tipo;
        var icono = tipo === 'success' ? '✓' : tipo === 'info' ? 'ℹ' : '⚠';
        
        // Crear elemento de alerta
        var alerta = $('<div class="alert ' + alertClass + ' alert-dismissible fade show notificacion-custom" role="alert">' +
            '<strong>' + icono + '</strong> ' + mensaje +
            '<button type="button" class="close" data-dismiss="alert">' +
            '<span>&times;</span>' +
            '</button>' +
            '</div>');
        
        // Agregar al body
        $('body').append(alerta);
        
        // Remover después de 3 segundos
        setTimeout(function() {
            alerta.alert('close');
        }, 3000);
    };
    
    // ========================================
    // INICIALIZAR AL CARGAR
    // ========================================
    $scope.inicializar();
});