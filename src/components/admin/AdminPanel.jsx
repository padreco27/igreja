export default function AdminPanel({
  isAuthenticated,
  handleLogin,
  loginForm,
  handleLoginChange,
  authError,
  showAdmin,
  setShowAdmin,
  handleLogout,
  adminTab,
  setAdminTab,
  editor,
  handleEditorChange,
  saveEditor,
  resetEditor
}) {
  return (
    <section id="admin" className="card full admin-card reveal">
      <h2>Administrador</h2>
      {!isAuthenticated ? (
        <form className="admin-grid" onSubmit={handleLogin}>
          <input
            name="user"
            value={loginForm.user}
            onChange={handleLoginChange}
            placeholder="Usuário"
          />
          <input
            name="password"
            type="password"
            value={loginForm.password}
            onChange={handleLoginChange}
            placeholder="Senha"
          />
          {authError && <p className="auth-error">{authError}</p>}
          <div className="admin-actions">
            <button className="btn-primary" type="submit">
              Entrar
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="admin-actions admin-top-actions">
            <button
              className="btn-secondary admin-toggle"
              type="button"
              onClick={() => setShowAdmin((prev) => !prev)}
            >
              {showAdmin
                ? "Fechar painel de edição"
                : "Abrir painel de edição"}
            </button>
            <button className="btn-secondary" type="button" onClick={handleLogout}>
              Sair
            </button>
          </div>

          {showAdmin && (
            <div className="admin-grid">
              <div className="admin-tabs">
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "geral" ? "active" : ""}`}
                  onClick={() => setAdminTab("geral")}
                >
                  Geral
                </button>
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "contato" ? "active" : ""}`}
                  onClick={() => setAdminTab("contato")}
                >
                  Contato
                </button>
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "celebracoes" ? "active" : ""}`}
                  onClick={() => setAdminTab("celebracoes")}
                >
                  Celebrações
                </button>
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "comunidade" ? "active" : ""}`}
                  onClick={() => setAdminTab("comunidade")}
                >
                  Clero e Comunidades
                </button>
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "links" ? "active" : ""}`}
                  onClick={() => setAdminTab("links")}
                >
                  Links
                </button>
                <button
                  type="button"
                  className={`admin-tab ${adminTab === "avisos" ? "active" : ""}`}
                  onClick={() => setAdminTab("avisos")}
                >
                  Avisos
                </button>
              </div>

              {adminTab === "geral" && (
                <>
                  <input
                    name="name"
                    value={editor.name}
                    onChange={handleEditorChange}
                    placeholder="Nome da paróquia"
                  />
                  <input
                    name="heroTitle"
                    value={editor.heroTitle}
                    onChange={handleEditorChange}
                    placeholder="Título principal"
                  />
                  <textarea
                    name="heroText"
                    value={editor.heroText}
                    onChange={handleEditorChange}
                    placeholder="Texto principal"
                    rows="2"
                  />
                </>
              )}

              {adminTab === "contato" && (
                <>
                  <input
                    name="officeHours"
                    value={editor.officeHours}
                    onChange={handleEditorChange}
                    placeholder="Horário da secretaria"
                  />
                  <input
                    name="phone"
                    value={editor.phone}
                    onChange={handleEditorChange}
                    placeholder="Telefone"
                  />
                  <input
                    name="email"
                    value={editor.email}
                    onChange={handleEditorChange}
                    placeholder="E-mail"
                  />
                  <input
                    name="address"
                    value={editor.address}
                    onChange={handleEditorChange}
                    placeholder="Endereço"
                  />
                  <input
                    name="secretary"
                    value={editor.secretary}
                    onChange={handleEditorChange}
                    placeholder="Responsável da secretaria"
                  />
                </>
              )}

              {adminTab === "celebracoes" && (
                <>
                  <input
                    name="celebrationsNote"
                    value={editor.celebrationsNote}
                    onChange={handleEditorChange}
                    placeholder="Texto principal das celebrações"
                  />
                  <input
                    name="forania"
                    value={editor.forania}
                    onChange={handleEditorChange}
                    placeholder="Forania"
                  />
                  <input
                    name="foundedYear"
                    value={editor.foundedYear}
                    onChange={handleEditorChange}
                    placeholder="Ano de criação"
                  />
                </>
              )}

              {adminTab === "comunidade" && (
                <>
                  <textarea
                    name="clergyText"
                    value={editor.clergyText}
                    onChange={handleEditorChange}
                    placeholder="Clero (um por linha)"
                    rows="4"
                  />
                  <textarea
                    name="communitiesShort"
                    value={editor.communitiesShort}
                    onChange={handleEditorChange}
                    placeholder="Resumo das comunidades"
                    rows="3"
                  />
                </>
              )}

              {adminTab === "links" && (
                <>
                  <input
                    name="diocesePage"
                    value={editor.diocesePage}
                    onChange={handleEditorChange}
                    placeholder="Link da diocese"
                  />
                  <input
                    name="instagramProfile"
                    value={editor.instagramProfile}
                    onChange={handleEditorChange}
                    placeholder="Link do perfil do Instagram"
                  />
                  <input
                    name="instagramPost"
                    value={editor.instagramPost}
                    onChange={handleEditorChange}
                    placeholder="Link do post (embed)"
                  />
                  <textarea
                    name="mapEmbed"
                    value={editor.mapEmbed}
                    onChange={handleEditorChange}
                    placeholder="Link embed do Google Maps"
                    rows="2"
                  />
                </>
              )}

              {adminTab === "avisos" && (
                <textarea
                  name="noticesText"
                  value={editor.noticesText}
                  onChange={handleEditorChange}
                  placeholder="Um aviso por linha"
                  rows="6"
                />
              )}

              <div className="admin-actions">
                <button className="btn-primary" type="button" onClick={saveEditor}>
                  Salvar alterações
                </button>
                <button className="btn-secondary" type="button" onClick={resetEditor}>
                  Restaurar padrão
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
