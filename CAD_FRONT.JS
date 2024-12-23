function validarFormulario(dados) {
    const erros = [];

    // Validação do nome
    if (dados.nome.length < 3) {
        erros.push("O nome deve ter pelo menos 3 caracteres.");
    }

    // Validação do telefone
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(dados.telefone)) {
        erros.push("O telefone deve estar no formato (XX) XXXXX-XXXX.");
    }

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
        erros.push("Por favor, insira um e-mail válido.");
    }

    // Validação da data de nascimento
    const dataNascimento = new Date(dados.data_nascimento);
    const hoje = new Date();
    if (dataNascimento > hoje) {
        erros.push("A data de nascimento não pode ser futura.");
    }

    // Validação do gênero
    if (dados.genero === "Selecionar") {
        erros.push("Por favor, selecione um gênero.");
    }

    // Validação da senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(dados.senha)) {
        erros.push(
            "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (@$!%*?&)."
        );
    }

    return erros;
}
