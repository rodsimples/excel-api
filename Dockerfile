FROM node:16-alpine

WORKDIR /app

# Copie apenas os arquivos de dependência primeiro
COPY package*.json ./

# Instale as dependências
RUN npm install --production

# Copie o resto dos arquivos
COPY . .

# Exponha a porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]