import re

from django.contrib.postgres.search import SearchQuery


class RawSearchQuery(SearchQuery):
    """Override to use to_tsquery instead of plainto_tsquery

    Allows formatted search terms for things like prefix matching search.

    This feature is coming in django 2.2 in april 2019 so remove and use that when
    possible.
    """
    def as_sql(self, compiler, connection):
        params = [self.value]
        if self.config:
            config_sql, config_params = compiler.compile(self.config)
            template = 'to_tsquery({}::regconfig, %s)'.format(config_sql)
            params = config_params + [self.value]
        else:
            template = 'to_tsquery(%s)'
        if self.invert:
            template = '!!({})'.format(template)
        return template, params


def prepare_search_term(term: str) -> str:
    """Sanitize the input term for a search using postgres to_tsquery.

    Cleans a search string to something acceptable for use with to_tsquery.
    Appends ':*' so that partial matches will also be returned.

    Args:
        term: the search term to be cleaned and prepared

    Returns:
        the prepared search string
    """

    query = re.sub(r'[!\'()|&]', ' ', term).strip()
    if query:
        query = re.sub(r'\s+', ' & ', query)
        query += ':*'

    return query
