"""tools"""

import time
import concurrent.futures
import logging
from typing import Optional, List, Dict
import requests
import os

APIS = {
'sentiment': "https://api-inference.huggingface.co/models/finiteautomata/beto-sentiment-analysis",
'emotion': "https://api-inference.huggingface.co/models/finiteautomata/beto-emotion-analysis",
}

class HandleApi:
    """Handle para interactuar con la api de huggin faces"""

    def __init__(self,option:str, workers:int=20) -> None:
        logging.basicConfig(level=logging.INFO)
        self._url = APIS[option]
        self._workers = workers
        self._try:int = 3
        self._session = requests.Session()

        #for development purposes it is left here by default
        token:str = os.getenv('TOKEN_API_HUGGING')

        self._headers = {
            "Authorization": f"Bearer {token}",
            "Accept-Encoding": "gzip",
        }


    @property
    def headers(self):
        """ HEADERS """
        return self._headers


    def query(self,payload:Dict[str, str]) -> dict:
        """ Perform queries using the data from the CSV."""
        respond = self._session.post(self._url, headers=self.headers, json=payload,timeout=60)

        # Retry the request if it fails and the maximum number of tries is not reached
        while respond.status_code != 200 and self._try > 0:
            try:
                respond = requests.post(self._url, headers=self.headers, json=payload,timeout=60)
                time.sleep(1)
            except requests.exceptions.ReadTimeout:
                continue

            self._try -=1

        self._try = 3
        return {'value':respond.json(),'input':payload}


    def get_all_data(self, payloads:List[Dict[str,str]]) -> Optional[List[dict]]:
        """Retrieve all the data using the provided payloads.   """
        data:List[dict] = []

        with concurrent.futures.ThreadPoolExecutor(max_workers=self._workers) as executor:
            futures = [executor.submit(self.query,payload = payload) for payload in payloads]
            for future in concurrent.futures.as_completed(futures):
                result: Optional[List] = future.result()
                if result is not None:
                    data.append(future.result())
        return data
