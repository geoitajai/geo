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
dados['codigo'] = dados['codigo'].str.slice(
    0, 2) + '.' + dados['codigo'].str.slice(2).str.replace('/', '-')

# %%
df = dados.loc[dados['codigo'].notnull()]

df = df[['codigo', 'denominacao', 'ate200', '200a400',
         'acima400', 'divisao']]

# %%
# exportar para base do app
# df.to_json('tabela_risco.json', orient='records')

# %%
# chave export categorias classificadas para csv
df['codcat'] = dados['codigo'].str.slice(0, 2) +\
    dados['ate200'] +\
    dados['200a400'] +\
    dados['acima400']

# %%
dfcat = df[['codcat',
            'divisao',
            'ate200',
            '200a400',
            'acima400']].value_counts().reset_index()
# %%
dfcat.to_csv('caturb.csv', index=False)

# %%
