
export const unsortedMockDataWithBandsNotParticipatingInAnyFestival =
    [
        {
            "name": "Twisted Tour",
            "bands": [
                {
                    "name": "Auditones",
                    "recordLabel": "Marner Sis. Recording"
                },
                {
                    "name": "Squint-281"
                },
                {
                    "name": "Manish Ditch",
                    "recordLabel": "ACR"
                },
                {
                    "name": "Summon",
                    "recordLabel": "Outerscope"
                },
                {
                    "name": "Winter Primates",
                    "recordLabel": ""
                }
            ]
        },
        {
            "bands": [
                {
                    "name": "Propeller",
                    "recordLabel": "Pacific Records"
                },
                {
                    "name": "Critter Girls",
                    "recordLabel": "ACR"
                }
            ]
        }
    ]

export const unsortedMockDataFromSameFestival = [
    {
        "name": "Twisted Tour",
        "bands": [
            {
                "name": "Auditones",
                "recordLabel": "Marner Sis. Recording"
            },
            {
                "name": "Squint-281"
            },

            {
                "name": "Winter Primates",
                "recordLabel": ""
            },
            {
                "name": "Manish Ditch",
                "recordLabel": "ACR"
            },
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }
        ]
    }]
export const unsortedMockDataFromDifferentFestival = [
    {
        "name": "Twisted Tour",
        "bands": [
            {
                "name": "Auditones",
                "recordLabel": "Marner Sis. Recording"
            },
            {
                "name": "Manish Ditch",
                "recordLabel": "ACR"
            },
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }

        ]
    },
    {
        "name": "Small Night In",
        "bands": [
            {
                "name": "The Black Dashes",
                "recordLabel": "Fourth Woman Records"
            },
            {
                "name": "Yanke East",
                "recordLabel": "MEDIOCRE Music"
            }
        ]
    },
]
export const unsortedMockDataWithBandParticipatingInMultipleFestivals = [
    {
        "name": "Twisted Tour",
        "bands": [
            {
                "name": "Auditones",
                "recordLabel": "Marner Sis. Recording"
            },
            {
                "name": "Manish Ditch",
                "recordLabel": "ACR"
            },
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }

        ]
    },
    {
        "name": "Small Night In",
        "bands": [
            {
                "name": "The Black Dashes",
                "recordLabel": "Fourth Woman Records"
            },
            {
                "name": "Yanke East",
                "recordLabel": "MEDIOCRE Music"
            },
            ,
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }
        ]
    },
]
export const unsortedMockDataWithBandNameAsEmptyString = [
    {
        "name": "Twisted Tour",
        "bands": [
            {
                "name": "Auditones",
                "recordLabel": "Marner Sis. Recording"
            },
            {
                "name": "Squint-281"
            },

            {
                "name": "Winter Primates",
                "recordLabel": ""
            },
            {
                //band name is empty, Assumption is empty band name still being listed and at the top
                "name": "",
                "recordLabel": "ACR"
            },
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }
        ]
    }]
export const unsortedMockDataWithBandNameHavingDigitsAsPrefix = [
    {
        "name": "Twisted Tour",
        "bands": [
            {
                "name": "Auditones",
                "recordLabel": "Marner Sis. Recording"
            },
            {
                "name": "Squint-281"
            },

            {
                "name": "Winter Primates",
                "recordLabel": ""
            },
            {
                //band name has got numeric as prefix
                "name": "1st Class Band",
                "recordLabel": "ACR"
            },
            {
                "name": "Summon",
                "recordLabel": "Outerscope"
            }
        ]
    }]