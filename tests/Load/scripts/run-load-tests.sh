#!/bin/bash

###############################################################################
# Script Maestro de Load Testing para API de Biblia
# 
# Este script ejecuta una suite completa de tests de carga en todos los
# endpoints críticos de la API de Biblia con diferentes niveles de concurrencia.
#
# Uso: ./run-load-tests.sh
###############################################################################

# Configuración
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESULTS_DIR="$SCRIPT_DIR/../results"

# Cargar configuración si existe
if [ -f "$SCRIPT_DIR/../.env" ]; then
    source "$SCRIPT_DIR/../.env"
else
    CONCURRENCY_LEVELS="10 50 100"
    TOTAL_REQUESTS=1000
fi

# Crear directorio de resultados
mkdir -p "$RESULTS_DIR"

# Timestamp para esta ejecución
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
SUMMARY_FILE="$RESULTS_DIR/summary_${TIMESTAMP}.txt"

# Banner
clear
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║     🔥 SUITE DE LOAD TESTING - API BIBLIA PDV 🔥             ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "📅 Fecha: $(date '+%Y-%m-%d %H:%M:%S')"
echo "📁 Resultados: $RESULTS_DIR"
echo ""
echo "⚠️  ADVERTENCIA: Estos tests generarán carga significativa."
echo "   Asegúrate de ejecutar en entorno de desarrollo/staging."
echo ""
read -p "¿Continuar? (s/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Tests cancelados."
    exit 1
fi

# Inicializar archivo de resumen
echo "═══════════════════════════════════════════════════════════════" > "$SUMMARY_FILE"
echo "  RESUMEN DE LOAD TESTING - API BIBLIA PDV" >> "$SUMMARY_FILE"
echo "═══════════════════════════════════════════════════════════════" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "Fecha: $(date '+%Y-%m-%d %H:%M:%S')" >> "$SUMMARY_FILE"
echo "Niveles de concurrencia: $CONCURRENCY_LEVELS" >> "$SUMMARY_FILE"
echo "Requests por test: $TOTAL_REQUESTS" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"

# Función para ejecutar test y extraer métricas
run_test() {
    local endpoint_name=$1
    local script_name=$2
    local concurrency=$3
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🧪 Ejecutando: $endpoint_name"
    echo "👥 Concurrencia: $concurrency usuarios"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Ejecutar el script
    bash "$SCRIPT_DIR/$script_name" "$concurrency" "$TOTAL_REQUESTS"
    
    # Pequeña pausa entre tests
    sleep 2
}

# Ejecutar tests para cada nivel de concurrencia
for LEVEL in $CONCURRENCY_LEVELS; do
    echo ""
    echo "╔═══════════════════════════════════════════════════════════════╗"
    echo "║  NIVEL DE CARGA: $LEVEL USUARIOS CONCURRENTES"
    echo "╚═══════════════════════════════════════════════════════════════╝"
    
    echo "" >> "$SUMMARY_FILE"
    echo "───────────────────────────────────────────────────────────────" >> "$SUMMARY_FILE"
    echo "NIVEL: $LEVEL usuarios concurrentes" >> "$SUMMARY_FILE"
    echo "───────────────────────────────────────────────────────────────" >> "$SUMMARY_FILE"
    
    # Test 1: Endpoint de Libros
    run_test "Endpoint de Libros" "ab-bible-books.sh" "$LEVEL"
    
    # Test 2: Endpoint de Versículos
    run_test "Endpoint de Versículos" "ab-bible-search.sh" "$LEVEL"
    
    # Test 3: Endpoint de Búsqueda
    run_test "Endpoint de Búsqueda" "ab-bible-search.sh" "$LEVEL"
    
    # Pausa más larga entre niveles
    echo ""
    echo "⏸️  Pausa de 5 segundos antes del siguiente nivel..."
    sleep 5
done

# Finalizar
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║     ✅ SUITE DE TESTS COMPLETADA EXITOSAMENTE                ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Resultados guardados en: $RESULTS_DIR"
echo "📄 Resumen: $SUMMARY_FILE"
echo ""
echo "💡 Próximos pasos:"
echo "   1. Revisar los archivos de resultados en $RESULTS_DIR"
echo "   2. Analizar métricas con: php tests/Load/scripts/analyze-results.php"
echo "   3. Identificar cuellos de botella y optimizar según sea necesario"
echo ""
