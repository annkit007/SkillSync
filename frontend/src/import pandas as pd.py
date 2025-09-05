import pandas as pd

# Load only SYN attack file
df_syn = pd.read_csv("CSV-03-11/03-11/Syn.csv", nrows=10000)

print("Columns:", df_syn.columns)
print("First rows:\n", df_syn.head())
