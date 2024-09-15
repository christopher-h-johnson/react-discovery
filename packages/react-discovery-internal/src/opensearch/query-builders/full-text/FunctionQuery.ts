export const FunctionQuery = (aggregations, postFilters, qfList, sort, stringInput) => {
  if (!stringInput && !sort) {
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
  } else if (!stringInput && sort) {
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
      },
      ...sort
    }
  } else if (sort && stringInput) {
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
      },
      ...sort
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
