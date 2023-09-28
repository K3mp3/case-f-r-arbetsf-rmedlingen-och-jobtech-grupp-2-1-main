export interface IChartJs {	
    "id": string,
    "occupation_label": string,
    "concept_taxonomy_id": string,
    "legacy_ams_taxonomy_id": number,
    "occupation_group": {
        "occupation_group_label": string,
        "concept_taxonomy_id": string,
        "ssyk": number
    },
    "metadata": {
        "enriched_ads_count": number,
        "enriched_ads_total_count": number,
        "enriched_ads_percent_of_total": number,
        "enriched_candidates_term_frequency": {
            "competencies": [
                {
                    "term": string,
                    "percent_for_occupation": number
                }
            ]
        }
    }
}