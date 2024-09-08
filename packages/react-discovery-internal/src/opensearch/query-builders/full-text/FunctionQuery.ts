export const FunctionQuery = (aggregations, postFilters, qfList, _sort, stringInput) => {
  if (!stringInput) {
    return {
      aggs: aggregations,
      query: {
        function_score: {
          query: {
            bool: {
              filter: postFilters
            }
          },
          random_score: {}
        }
      }
    }
  }

  return {
    aggs: aggregations,
    highlight: {
      fields: {
        '*': {}
      }
    },
    query: {
      function_score: {
        query: {
          bool: {
            filter: postFilters,
            should: [
              {
                simple_query_string: {
                  default_operator: 'and',
                  fields: qfList,
                  query: stringInput
                }
              }]
          }
        },
        random_score: {}
      }
    }
  }
}
