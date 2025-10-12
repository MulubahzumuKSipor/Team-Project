INSERT INTO users (user_id, username, email, user_data)
VALUES
-- User 3: Sophia Brown
-- User 10: Isabella Anderson
(
    10,
    'isabellad',
    'isabella.anderson@x.dummyjson.com',
    '{
      "firstName": "Isabella",
      "lastName": "Anderson",
      "maidenName": "Davis",
      "age": 31,
      "gender": "female",
      "phone": "+49 770-658-4885",
      "password": "isabelladpass",
      "birthDate": "1993-6-10",
      "image": "https://dummyjson.com/icon/isabellad/128",
      "bloodGroup": "A-",
      "height": 150.56,
      "weight": 50.1,
      "eyeColor": "Brown",
      "hair": {
        "color": "Blonde",
        "type": "Curly"
      },
      "ip": "114.9.114.205",
      "address": {
        "address": "1964 Oak Street",
        "city": "New York",
        "state": "Utah",
        "stateCode": "UT",
        "postalCode": "89352",
        "coordinates": {
          "lat": 41.331324,
          "lng": 151.782727
        },
        "country": "United States"
      },
      "macAddress": "b1:b0:d0:a2:82:80",
      "university": "California Institute of Technology (Caltech)",
      "bank": {
        "cardExpire": "05/27",
        "cardNumber": "6118714010128731",
        "cardType": "NPS",
        "currency": "CNY",
        "iban": "GBZRGDMKUOTO34HBCI7A986J"
      },
      "company": {
        "department": "Marketing",
        "name": "Pollich - Hilpert",
        "title": "Chief Financial Officer",
        "address": {
          "address": "1029 Adams Street",
          "city": "San Diego",
          "state": "Maryland",
          "stateCode": "MD",
          "postalCode": "63847",
          "coordinates": {
            "lat": -25.843393,
            "lng": -62.692681
          },
          "country": "United States"
        }
      },
      "ein": "127-297",
      "ssn": "902-438-728",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 11: Liam Garcia
(
    11,
    'liamg',
    'liam.garcia@x.dummyjson.com',
    '{
      "firstName": "Liam",
      "lastName": "Garcia",
      "maidenName": "",
      "age": 29,
      "gender": "male",
      "phone": "+92 870-217-6201",
      "password": "liamgpass",
      "birthDate": "1995-6-6",
      "image": "https://dummyjson.com/icon/liamg/128",
      "bloodGroup": "AB-",
      "height": 162.32,
      "weight": 93.16,
      "eyeColor": "Violet",
      "hair": {
        "color": "Red",
        "type": "Wavy"
      },
      "ip": "56.201.85.9",
      "address": {
        "address": "576 Fifth Street",
        "city": "Denver",
        "state": "South Dakota",
        "stateCode": "SD",
        "postalCode": "57252",
        "coordinates": {
          "lat": -66.218177,
          "lng": -145.340165
        },
        "country": "United States"
      },
      "macAddress": "31:9a:28:8b:99:6c",
      "university": "Ohio State University",
      "bank": {
        "cardExpire": "02/27",
        "cardNumber": "2302893002194899",
        "cardType": "Discover",
        "currency": "GBP",
        "iban": "O8ENPRB9UVBL2EFZ7601KC09"
      },
      "company": {
        "department": "Services",
        "name": "Considine - Torp",
        "title": "Web Developer",
        "address": {
          "address": "27 Cedar Street",
          "city": "Philadelphia",
          "state": "Connecticut",
          "stateCode": "CT",
          "postalCode": "79574",
          "coordinates": {
            "lat": -81.841588,
            "lng": 31.79423
          },
          "country": "United States"
        }
      },
      "ein": "326-604",
      "ssn": "933-784-949",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 12: Mia Rodriguez
(
    12,
    'miar',
    'mia.rodriguez@x.dummyjson.com',
    '{
      "firstName": "Mia",
      "lastName": "Rodriguez",
      "maidenName": "",
      "age": 24,
      "gender": "female",
      "phone": "+49 989-461-8403",
      "password": "miarpass",
      "birthDate": "2000-8-4",
      "image": "https://dummyjson.com/icon/miar/128",
      "bloodGroup": "O-",
      "height": 188.08,
      "weight": 56.03,
      "eyeColor": "Blue",
      "hair": {
        "color": "Purple",
        "type": "Wavy"
      },
      "ip": "11.72.253.90",
      "address": {
        "address": "1627 Sixth Street",
        "city": "Jacksonville",
        "state": "West Virginia",
        "stateCode": "WV",
        "postalCode": "41810",
        "coordinates": {
          "lat": 24.857497,
          "lng": -34.865429
        },
        "country": "United States"
      },
      "macAddress": "53:d7:a4:6:1e:58",
      "university": "William & Mary",
      "bank": {
        "cardExpire": "05/26",
        "cardNumber": "1539872303456158",
        "cardType": "Carte Bancaire",
        "currency": "CAD",
        "iban": "EBMD95RLK8B82ZAZNXBJ09V5"
      },
      "company": {
        "department": "Accounting",
        "name": "Miller, Schowalter and Wisozk",
        "title": "Business Analyst",
        "address": {
          "address": "1039 Washington Street",
          "city": "Philadelphia",
          "state": "New Jersey",
          "stateCode": "NJ",
          "postalCode": "57518",
          "coordinates": {
            "lat": 85.455933,
            "lng": 164.246103
          },
          "country": "United States"
        }
      },
      "ein": "754-660",
      "ssn": "749-524-124",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 13: Noah Hernandez
(
    13,
    'noahh',
    'noah.hernandez@x.dummyjson.com',
    '{
      "firstName": "Noah",
      "lastName": "Hernandez",
      "maidenName": "",
      "age": 40,
      "gender": "male",
      "phone": "+49 393-605-6968",
      "password": "noahhpass",
      "birthDate": "1984-6-5",
      "image": "https://dummyjson.com/icon/noahh/128",
      "bloodGroup": "AB+",
      "height": 188.62,
      "weight": 69.49,
      "eyeColor": "Brown",
      "hair": {
        "color": "Red",
        "type": "Curly"
      },
      "ip": "169.154.126.57",
      "address": {
        "address": "1413 Maple Street",
        "city": "New York",
        "state": "North Dakota",
        "stateCode": "ND",
        "postalCode": "73696",
        "coordinates": {
          "lat": -25.0377,
          "lng": -151.70469
        },
        "country": "United States"
      },
      "macAddress": "d4:fe:ae:8f:eb:a3",
      "university": "New York University (NYU)",
      "bank": {
        "cardExpire": "05/26",
        "cardNumber": "1681772579326385",
        "cardType": "Discover",
        "currency": "SEK",
        "iban": "G4UIZKIQVPJM9D31XQVR1E9Z"
      },
      "company": {
        "department": "Engineering",
        "name": "Botsford, Marquardt and Roberts",
        "title": "Database Administrator",
        "address": {
          "address": "62 Third Street",
          "city": "Seattle",
          "state": "Oregon",
          "stateCode": "OR",
          "postalCode": "83474",
          "coordinates": {
            "lat": 19.490447,
            "lng": -13.173207
          },
          "country": "United States"
        }
      },
      "ein": "877-628",
      "ssn": "660-847-389",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 14: Charlotte Lopez
(
    14,
    'charlottem',
    'charlotte.lopez@x.dummyjson.com',
    '{
      "firstName": "Charlotte",
      "lastName": "Lopez",
      "maidenName": "Martinez",
      "age": 36,
      "gender": "female",
      "phone": "+44 373-953-5028",
      "password": "charlottempass",
      "birthDate": "1988-6-8",
      "image": "https://dummyjson.com/icon/charlottem/128",
      "bloodGroup": "AB-",
      "height": 178.92,
      "weight": 82.46,
      "eyeColor": "Brown",
      "hair": {
        "color": "Gray",
        "type": "Kinky"
      },
      "ip": "119.103.95.60",
      "address": {
        "address": "208 Second Street",
        "city": "Columbus",
        "state": "Ohio",
        "stateCode": "OH",
        "postalCode": "42044",
        "coordinates": {
          "lat": -44.443762,
          "lng": -151.420561
        },
        "country": "United States"
      },
      "macAddress": "f6:ff:37:aa:6c:f1",
      "university": "Northeastern University",
      "bank": {
        "cardExpire": "02/27",
        "cardNumber": "5675368650551956",
        "cardType": "Maestro",
        "currency": "CNY",
        "iban": "FKK6U634LGI3E7N517DLVVTL"
      },
      "company": {
        "department": "Accounting",
        "name": "Zulauf and Sons",
        "title": "Chief Executive Officer",
        "address": {
          "address": "569 Jefferson Street",
          "city": "Los Angeles",
          "state": "Montana",
          "stateCode": "MT",
          "postalCode": "17779",
          "coordinates": {
            "lat": -18.371256,
            "lng": 22.566258
          },
          "country": "United States"
        }
      },
      "ein": "364-782",
      "ssn": "255-491-479",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 15: William Gonzalez
(
    15,
    'williamg',
    'william.gonzalez@x.dummyjson.com',
    '{
      "firstName": "William",
      "lastName": "Gonzalez",
      "maidenName": "",
      "age": 32,
      "gender": "male",
      "phone": "+81 905-252-7319",
      "password": "williamgpass",
      "birthDate": "1992-3-27",
      "image": "https://dummyjson.com/icon/williamg/128",
      "bloodGroup": "B-",
      "height": 173.21,
      "weight": 82.41,
      "eyeColor": "Hazel",
      "hair": {
        "color": "Gray",
        "type": "Curly"
      },
      "ip": "250.2.241.204",
      "address": {
        "address": "31 Maple Street",
        "city": "San Jose",
        "state": "Utah",
        "stateCode": "UT",
        "postalCode": "78243",
        "coordinates": {
          "lat": 8.152876,
          "lng": 113.29799
        },
        "country": "United States"
      },
      "macAddress": "f5:68:28:f9:ec:89",
      "university": "Tufts University",
      "bank": {
        "cardExpire": "03/27",
        "cardNumber": "6053000793215148",
        "cardType": "Mir",
        "currency": "EUR",
        "iban": "AR01SNDMKGECX0EYH7UCW61W"
      },
      "company": {
        "department": "Marketing",
        "name": "Spinka - Dickinson",
        "title": "Software Architect",
        "address": {
          "address": "1538 Eighth Street",
          "city": "San Jose",
          "state": "Missouri",
          "stateCode": "MO",
          "postalCode": "29673",
          "coordinates": {
            "lat": 24.169361,
            "lng": -29.395167
          },
          "country": "United States"
        }
      },
      "ein": "830-515",
      "ssn": "690-544-755",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "moderator"
    }'::jsonb
),

-- User 16: Avery Perez
(
    16,
    'averyp',
    'avery.perez@x.dummyjson.com',
    '{
      "firstName": "Avery",
      "lastName": "Perez",
      "maidenName": "",
      "age": 25,
      "gender": "female",
      "phone": "+61 731-431-3457",
      "password": "averyppass",
      "birthDate": "1999-3-10",
      "image": "https://dummyjson.com/icon/averyp/128",
      "bloodGroup": "O-",
      "height": 172.68,
      "weight": 93.9,
      "eyeColor": "Brown",
      "hair": {
        "color": "Green",
        "type": "Curly"
      },
      "ip": "131.217.4.214",
      "address": {
        "address": "1125 First Street",
        "city": "Columbus",
        "state": "Iowa",
        "stateCode": "IA",
        "postalCode": "30973",
        "coordinates": {
          "lat": 12.789127,
          "lng": 85.792598
        },
        "country": "United States"
      },
      "macAddress": "b3:ff:f3:c5:37:46",
      "university": "Harvard University",
      "bank": {
        "cardExpire": "04/27",
        "cardNumber": "0961014686718571",
        "cardType": "Carte Bancaire",
        "currency": "USD",
        "iban": "28JYZAY4KYT48YI8QW40PWXR"
      },
      "company": {
        "department": "Accounting",
        "name": "Herzog Inc",
        "title": "Database Administrator",
        "address": {
          "address": "183 Maple Street",
          "city": "New York",
          "state": "Rhode Island",
          "stateCode": "RI",
          "postalCode": "45238",
          "coordinates": {
            "lat": -53.318189,
            "lng": 105.835271
          },
          "country": "United States"
        }
      },
      "ein": "348-493",
      "ssn": "679-523-686",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
      },
      "role": "user"
    }'::jsonb
);