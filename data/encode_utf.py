import pandas as pd
try:
    # Read Excel file 
    df = pd.read_excel('telugu_authors.csv')
    print('✅ Excel file loaded successfully!')
    print(f'Shape: {df.shape}')
    print('Columns:', list(df.columns))
    print('First few rows:')
    print(df.head(3))
    
    # Save as UTF-8 CSV
    df.to_csv('telugu_authors_utf8.csv', index=False, encoding='utf-8')
    print('✅ Converted to UTF-8 CSV: telugu_authors_utf8.csv')
    
except Exception as e:
    print('❌ Error:', e)