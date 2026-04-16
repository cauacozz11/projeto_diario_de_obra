-- CreateEnum
CREATE TYPE "TipoRegistro" AS ENUM ('AUDIO', 'TEXTO', 'IMAGEM');

-- CreateEnum
CREATE TYPE "StatusObra" AS ENUM ('PLANEJADA', 'EM_ANDAMENTO', 'PAUSADA', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "StatusProcessamento" AS ENUM ('PENDENTE', 'PROCESSANDO', 'CONCLUIDO', 'ERRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "descricao" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "status" "StatusObra" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioAdminId" TEXT NOT NULL,

    CONSTRAINT "Obra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroObra" (
    "id" TEXT NOT NULL,
    "tipo" "TipoRegistro" NOT NULL,
    "conteudo" TEXT,
    "transcricao" TEXT,
    "arquivoUrl" TEXT,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusProcessamento" "StatusProcessamento" NOT NULL DEFAULT 'CONCLUIDO',
    "duracaoSegundos" INTEGER,
    "obraId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "RegistroObra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_usuarioAdminId_fkey" FOREIGN KEY ("usuarioAdminId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroObra" ADD CONSTRAINT "RegistroObra_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroObra" ADD CONSTRAINT "RegistroObra_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
