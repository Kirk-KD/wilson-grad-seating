#!/usr/bin/env python3
import csv
import random
from faker import Faker

def generate_oen():
    """
    Generate a 9-digit Ontario Education Number (OEN):
      - 8 random digits
      - 1 check digit (random placeholder)
    """
    digits = [str(random.randint(0, 9)) for _ in range(8)]
    check = str(random.randint(0, 9))
    return ''.join(digits) + check

def generate_students_csv(filename='sample/students_sample.csv', count=100):
    fake = Faker('en_CA')  # Canadian locale
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['email', 'first_name', 'last_name', 'OEN'])
        for _ in range(count):
            first = fake.first_name()
            last = fake.last_name()
            email = fake.email()
            oen = generate_oen()
            writer.writerow([email, first, last, oen])
    print(f"Generated {count} students in {filename}")

if __name__ == '__main__':
    import sys
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 100
    generate_students_csv(count=n)
