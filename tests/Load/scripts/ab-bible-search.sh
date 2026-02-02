#!/bin/bash

###############################################################################
# Script de Load Testing para Endpoint de Búsqueda en la Biblia
# 
# Uso: ./ab-bible-search.sh [concurrency] [requests] [query]
# Ejemplo: ./ab-bible-search.sh 50 1000 "amor"
#
# Parámetros:
#   concurrency - Número de usuarios concurrentes (default: 10)
#   requests    - Número total de requests (default: 100)
#   query       - Término de búsqueda (default: "amor")
###############################################################################

# Configuración
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESULTS_DIR="$SCRIPT_DIR/../results"

# Cargar configuración si existe
if [ -f "$SCRIPT_DIR/../.env" ]; then
    source "$SCRIPT_DIR/../.env"
else
    APP_URL="http://localhost:8000"
    BIBLE_VERSION="RV1960"
    SEARCH_QUERY="amor"
fi

# Parámetros
CONCURRENCY=${1:-10}
REQUESTS=${2:-100}
QUERY=${3:-$SEARCH_QUERY}
ENDPOINT="${APP_URL}/es/api/bible/search?version=${BIBLE_VERSION}&query=${QUERY}"

# Crear directorio de resultados si no existe
mkdir -p "$RESULTS_DIR"

# Nombre del archivo de resultados
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULT_FILE="$RESULTS_DIR/search_c${CONCURRENCY}_r${REQUESTS}_${TIMESTAMP}.txt"

# Mostrar información
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Load Test: Endpoint de Búsqueda en la Biblia"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 URL: $ENDPOINT"
echo "🔎 Búsqueda: '$QUERY'"
echo "👥 Usuarios concurrentes: $CONCURRENCY"
echo "📊 Total de requests: $REQUESTS"
echo "📁 Resultados: $RESULT_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ejecutar Apache Bench
ab -n "$REQUESTS" -c "$CONCURRENCY" -g "$RESULTS_DIR/gnuplot_search_${TIMESTAMP}.tsv" "$ENDPOINT" | tee "$RESULT_FILE"

# Extraer métricas clave
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📈 Resumen de Métricas Clave"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Requests por segundo
RPS=$(grep "Requests per second:" "$RESULT_FILE" | awk '{print $4}')
echo "🚀 Requests por segundo: $RPS"

# Tiempo por request
TPR=$(grep "Time per request:" "$RESULT_FILE" | head -1 | awk '{print $4}')
echo "⏱️  Tiempo por request: ${TPR}ms"

# Requests fallidos
FAILED=$(grep "Failed requests:" "$RESULT_FILE" | awk '{print $3}')
echo "❌ Requests fallidos: $FAILED"

# Percentil 95
P95=$(grep "95%" "$RESULT_FILE" | awk '{print $2}')
echo "📊 Percentil 95: ${P95}ms"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Test completado. Resultados guardados en:"
echo "   $RESULT_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
