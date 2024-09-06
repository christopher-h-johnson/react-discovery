export const FunctionQuery = (postFilters, qfList, _sort, stringInput) => {
  if (!stringInput) {
    return {
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
