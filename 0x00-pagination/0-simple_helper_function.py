#!/usr/bin/env python3
""" function"""


def index_range(page: int, page_size: int) -> tuple:
    """
    function should return a tuple of size two containing a start index and
    an end index corresponding to the range of indexes to return
    in a list for those particular pagination parameters.
    Args:
        page(int): integer
        page_size(int): integer
    Returns:
        tuple: tuple of size
    """
    start = (page - 1) * page_size
    end = page * page_size
    return start, end
