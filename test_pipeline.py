"""
IncuBrix Engine Automated Audit & Unit Test Suite
Run with: python -m unittest test_pipeline.py
"""

import csv
import json
import os
import unittest

class TestCreatorOpsPipeline(unittest.TestCase):
    def setUp(self):
        self.workspace_dir = os.path.dirname(os.path.abspath(__file__))
        self.csv_path = os.path.join(self.workspace_dir, "leads.csv")
        self.json_path = os.path.join(self.workspace_dir, "leads.json")
        self.outreach_dir = os.path.join(self.workspace_dir, "outreach")
        self.priority_a_json = os.path.join(self.outreach_dir, "priority_a_sequences.json")

    def test_01_leads_csv_exists_and_volume(self):
        self.assertTrue(os.path.exists(self.csv_path), "leads.csv must exist in root.")
        with open(self.csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        self.assertGreaterEqual(len(rows), 1000, "Must contain at least 1,000 unique leads.")

    def test_02_zero_duplicates(self):
        with open(self.csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            channels = [r["Channel_Title"].strip().lower() for r in reader]
        self.assertEqual(len(channels), len(set(channels)), "Zero duplicate channels allowed.")

    def test_03_priority_a_count_and_sequences(self):
        with open(self.csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            priority_a = [r for r in reader if r["Priority_Tier"] == "Priority A"]
        self.assertEqual(len(priority_a), 25, "Exactly 25 leads must be marked as Priority A.")

        self.assertTrue(os.path.exists(self.priority_a_json), "priority_a_sequences.json must exist.")
        with open(self.priority_a_json, "r", encoding="utf-8") as f:
            seq_data = json.load(f)
        self.assertEqual(len(seq_data), 25, "All 25 Priority A leads must have complete custom sequences.")
        for lead_id, data in seq_data.items():
            self.assertIn("step_1", data["sequence"])
            self.assertIn("step_2", data["sequence"])
            self.assertIn("step_3", data["sequence"])
            self.assertIn("subject", data["sequence"]["step_1"])
            self.assertIn("body", data["sequence"]["step_1"])

    def test_04_geo_distribution_compliance(self):
        with open(self.csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        tier_1 = {"United States", "United Kingdom", "Canada", "Australia", "Singapore", "New Zealand"}
        country_counts = {}
        for r in rows:
            c = r["Country"]
            country_counts[c] = country_counts.get(c, 0) + 1
        
        tier_1_sum = sum(count for country, count in country_counts.items() if country in tier_1)
        tier_1_pct = (tier_1_sum / len(rows)) * 100
        self.assertGreaterEqual(tier_1_pct, 80.0, "Tier-1 English speaking markets must be >= 80%.")
        
        for country, count in country_counts.items():
            pct = (count / len(rows)) * 100
            self.assertLessEqual(pct, 60.0, f"No country can exceed 60% of total (Failed on {country}: {pct:.1f}%).")

    def test_05_field_completeness(self):
        required_fields = [
            "Lead_ID", "Creator_Name", "Channel_Title", "Segment", "Country",
            "Platform_Primary", "Platform_URL", "Audience_Size", "Verified_Email",
            "Verified_LinkedIn", "Best_Channel", "Backup_Channel",
            "Active_Content_Signal", "Commercial_Evidence", "IncuBrix_Need_Evidence",
            "Workflow_Fragmentation_Index", "Priority_Tier"
        ]
        with open(self.csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                for rf in required_fields:
                    self.assertTrue(row.get(rf), f"Row {i} is missing required field: {rf}")

if __name__ == "__main__":
    unittest.main()
