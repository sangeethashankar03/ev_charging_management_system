import unittest
import sqlite3
import os
import json
from app import app

class TestEVChargingApp(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def tearDown(self):
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stations.db")
        conn = sqlite3.connect(db_path)
        conn.execute("DELETE FROM stations WHERE location = 'Test City'")
        conn.commit()
        conn.close()

    def test_add_station(self):
        data = {
            "name": "Test Station",
            "location": "Test City",
            "type": "Fast",
            "status": "Active",
            "power": 220,
            "date": "2026-04-08"
        }
        response = self.client.post('/stations', json=data)
        self.assertEqual(response.status_code, 201)

    def test_get_stations(self):
        response = self.client.get('/stations')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)

    def test_duplicate_prevention(self):
        data = {
            "name": "Duplicate Test",
            "location": "Test City",
            "type": "Standard",
            "status": "Active",
            "power": 150,
            "date": "2026-04-08"
        }
        self.client.post('/stations', json=data)
        response = self.client.post('/stations', json=data)
        self.assertEqual(response.status_code, 409)

    def test_delete_station(self):
        data = {
            "name": "To Delete",
            "location": "Test City",
            "type": "Fast",
            "status": "Active",
            "power": 100,
            "date": "2026-04-08"
        }
        post_response = self.client.post('/stations', json=data)
        station_id = json.loads(post_response.data).get('id')
        response = self.client.delete(f'/stations/{station_id}')
        self.assertEqual(response.status_code, 200)

    def test_update_station(self):
        data = {
            "name": "Update Test",
            "location": "Test City",
            "type": "Fast",
            "status": "Active",
            "power": 100,
            "date": "2026-04-08"
        }
        post_response = self.client.post('/stations', json=data)
        station_id = json.loads(post_response.data).get('id')

        updated_data = {
            "name": "Update Test",
            "location": "Test City",
            "type": "Rapid",
            "status": "Maintenance",
            "power": 200,
            "date": "2026-04-08"
        }
        response = self.client.put(f'/stations/{station_id}', json=updated_data)
        self.assertEqual(response.status_code, 200)

    def test_full_flow(self):
        data = {
            "name": "Integration Station",
            "location": "Test City",
            "type": "Fast",
            "status": "Active",
            "power": 100,
            "date": "2026-04-08"
        }
        post_response = self.client.post('/stations', json=data)
        self.assertEqual(post_response.status_code, 201)

        get_response = self.client.get('/stations')
        self.assertEqual(get_response.status_code, 200)
        stations = json.loads(get_response.data)
        found = any(s["name"] == "Integration Station" for s in stations)
        self.assertTrue(found)

if __name__ == '__main__':
    unittest.main(verbosity=2)