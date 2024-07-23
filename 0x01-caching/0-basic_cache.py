#!/usr/bin/env python3
""" create class"""
from base_caching import BaseCaching



class BasicCache(BaseCaching):
    """class BasicCache that inherits from BaseCaching"""
    def __init__(self):
        """initialisation"""
        super().__init__()
        self.cache_data = {}

    def put(self, key, item):
        """method that assigns dictionary
        """
        self.cache_data[key] = item
        if key is None or item is None:
                return

    def get(self, key):
        """
        returns a value
        """
        if key is None or not self.cache_data:
            return None
        return self.cache_data.get(key, None)
