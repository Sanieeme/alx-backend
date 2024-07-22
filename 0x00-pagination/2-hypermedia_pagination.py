#!/usr/bin/env python3
""" import module"""
import csv
import math
from typing import List, Dict, Any


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
    if page <= 0 or page_size <= 0:
        raise AssertionError("Error")
    start = (page - 1) * page_size
    end = page + page_size
    return start, end


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
                self.__dataset = dataset[1:]
            return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        function
        """
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError("Error")
        if page <= 0 or page_size <= 0:
            raise AssertionError("Error")

        dataset = self.dataset()
        if dataset is None:
            return []

        start, end = index_range(page, page_size)

        if start >= len(dataset):
            return []
        return dataset[start:min(end, len(dataset))]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        function
        """
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError("Error")
        if page <= 0 or page_size <= 0:
            if page <= 0 or page_size <= 0:
                raise AssertionError("Error")
            data = self.get_page(page, page_size)
            total_items = len(self.dataset())
            total_pages = math.ceil(total_items / page_size)
            next_page = page + 1 if page < total_pages else None
            prev_page = page - 1 if page > 1 else None
            return {
                'page': page,
                'page_size': page_size,
                'data': data,
                'next_page': next_page,
                'total_pages': total_pages,
                'total_items': total_items
                }
