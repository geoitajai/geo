# %% [markdown]
# # Tabela decreto 11.985/2020
# ## Grau de Risco das Atividades Econômicas
# [link](http://leismunicipa.is/hyrip)
#
# obs.:
# propagate last valid observation forward to next valid
# ```df.fillna(method='ffill')```

# %%
import pandas as pd
import numpy as np

# %%
dados = pd.read_csv('dados/risco_uso.tsv',
                    encoding='UTF-8',
                    sep='\t'
                    )

# %%
dados['tipo'] = np.nan
dados['tipodescr'] = 'Nova inscrição'
dados['id'] = dados.index

# %%
dados.to_json('temp.json', orient='records')

# %%
