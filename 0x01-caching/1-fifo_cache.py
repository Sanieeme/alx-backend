#!/usr/bin/env python3
""" import module"""
from base_caching import BaseCaching
from collections import OrderedDict


class FIFOCache(BaseCaching):
    """class FIFOCache that inherits from BaseCaching"""
    def __init__(self):
        """initialisation"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """method that assigns dictionary
        """
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discard_key, _ = self.cache_data.popitem(last=False)
            print("Discard: {}". format(discard_key))
        self.cache_data[key] = item

    def get(self, key):
        """
        method returns a value
        """
        if key is None or not self.cache_data:
            return None
        return self.cache_data.get(key, None)
