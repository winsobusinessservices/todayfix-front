import sys

file_path = r'e:\demo-test\todayfix-loader\src\features\profile\ProfileRequests.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("File read successfully, length:", len(content))
