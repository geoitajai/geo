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
dados = pd.read_csv('dados/grau_de_risco_risco.tsv',
                    encoding='UTF-8',
                    sep='\t'
                    )

# %%
dados['codigo'] = dados['Subclasse 2.3']

dados['denominacao'] = np.where(dados['Subclasse 2.3'].notnull(),
                                dados['Denominação'], np.nan)

dados['ate200'] = dados['Até 200 m2']

dados['200a400'] = dados['De 200 m2 a 400 m2']

dados['acima400'] = dados['acima de 400 m2']

dados['classe'] = np.where(dados['Classe'].notnull(),
                           dados['Denominação'], np.nan)

dados['grupo'] = np.where(dados['Grupo'].notnull(),
                          dados['Denominação'], np.nan)

dados['divisao'] = np.where(dados['Divisão'].notnull(),
                            dados['Denominação'], np.nan)

dados['secao'] = np.where(dados['Seção'].notnull(),
                          dados['Denominação'], np.nan)

# %%
dados[['classe', 'grupo', 'divisao', 'secao']] = dados[[
    'classe', 'grupo', 'divisao', 'secao']].fillna(method='ffill')

# %%
df = dados.loc[dados['codigo'].notnull()]

df = df[['codigo', 'denominacao', 'ate200', '200a400',
         'acima400', 'divisao']]

# %%
df.to_json('tabela_risco.json', orient='records')

# %%
