#### create index mapping
curl -u admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD -X PUT "localhost:8000/hsp2" -H 'Content-Type: application/json' -d @test-data/hsp_mapping.json

#### create test data set
curl -u admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD -X PUT "localhost:8000/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @test-data/test-data-09.txt

#### get highlighted nested documents
curl -u admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD -X GET "localhost:8000/hsp1/_search" -H 'Content-Type: application/json' -d'
{
  "query": {
    "nested": {
      "path": "entities.entities",
      "query": {
        "bool": {
          "must": [
            { "match": { "entities.entities.beschreibungFaszikelText_t": "Pulvinar" }}
          ]
        }
      },
      "inner_hits": { 
        "highlight": {
          "fields": {
            "entities.entities.beschreibungFaszikelText_t": {}
          }
        }
      }
    }
  }
}'
