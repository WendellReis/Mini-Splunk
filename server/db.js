const argon2 = require("argon2");

async function test() {
  try {
    const password = "minhaSenhaSegura123";

    // Gerar hash
    const hash = await argon2.hash(password);
    console.log("Hash:", hash.length);

    // Verificar senha
    const isValid = await argon2.verify(hash, password);
    console.log("Senha válida?", isValid);

  } catch (err) {
    console.error("Erro:", err);
  }
}

test();