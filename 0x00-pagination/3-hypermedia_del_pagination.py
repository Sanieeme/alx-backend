#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""
import csv
import math
from typing import List, Dict, Optional


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
                self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: Optional[int] = None, page_size: int = 10) -> Dict:
        """returns a dictionary
        """
        assert isinstance(index, (int, type(None))), "Error"
        assert isinstance(page_size, int) and page_size > 0, "Error"

        if index is None:
            index = 0
        else:
            assert 0 <= index < len(self.dataset()), "Index out of range"
        data_length = len(self.dataset())
        data = []
        next_index = index

        while len(data) < page_size and next_index < data_length:
            if self.dataset()[next_index] is not None:
                data.append(self.dataset()[next_index])
            next_index += 1

            result = {
                    'index': index,
                    'next_index': next_index,
                    'page_size': page_size,
                    'data': data
                    }
            return result
