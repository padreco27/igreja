import { createContext, useState, useEffect, useMemo } from "react";
import { parishData as initialParishData } from "../data";

export const SiteContext = createContext();

const STORAGE_KEY = "paroquia-site-data-v1";
const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "123456";

function toEditorState(data) {
  return {
    name: data.name,
    heroTitle: data.heroTitle,
    heroText: data.heroText,
    celebrationsNote: data.celebrationsNote || "",
    forania: data.forania || "",
    foundedYear: data.foundedYear || "",
    officeHours: data.officeHours,
    secretary: data.secretary || "",
    phone: data.phone,
    email: data.email,
    address: data.address,
    clergyText: Array.isArray(data.clergy) ? data.clergy.join("\n") : "",
    communitiesShort: data.communitiesShort || "",
    noticesText: data.notices?.join("\n") || "",
    diocesePage: data.links?.diocesePage || "",
    instagramProfile: data.links?.instagramProfile || "",
    instagramPost: data.links?.instagramPost || "",
    mapEmbed: data.links?.mapEmbed || "",
  };
}

function formatPhoneLinks(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) {
    return { phoneHref: "#", whatsapp: "#" };
  }
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return {
    phoneHref: `tel:+${withCountry}`,
    whatsapp: `https://wa.me/${withCountry}`,
  };
}

export function SiteProvider({ children }) {
  const [siteData, setSiteData] = useState(initialParishData);
  const [editor, setEditor] = useState(toEditorState(initialParishData));
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState("geral");
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", password: "" });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setSiteData(parsed);
      setEditor(toEditorState(parsed));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const phoneLinks = useMemo(
    () => formatPhoneLinks(siteData.phone),
    [siteData.phone]
  );
  
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações da paróquia."
  );

  function handleEditorChange(event) {
    const { name, value } = event.target;
    setEditor((prev) => ({ ...prev, [name]: value }));
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogin(event) {
    event.preventDefault();
    if (
      loginForm.user === ADMIN_USER &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setShowAdmin(true);
      setAuthError("");
      setLoginForm({ user: "", password: "" });
      return;
    }
    setAuthError("Login ou senha inválidos.");
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setShowAdmin(false);
    setAdminTab("geral");
  }

  function saveEditor() {
    const notices = editor.noticesText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const clergy = editor.clergyText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const links = {
      ...siteData.links,
      diocesePage: editor.diocesePage,
      instagramProfile: editor.instagramProfile,
      instagramPost: editor.instagramPost,
      mapEmbed: editor.mapEmbed,
      ...formatPhoneLinks(editor.phone),
    };

    const updated = {
      ...siteData,
      name: editor.name,
      heroTitle: editor.heroTitle,
      heroText: editor.heroText,
      celebrationsNote: editor.celebrationsNote,
      forania: editor.forania,
      foundedYear: editor.foundedYear,
      officeHours: editor.officeHours,
      secretary: editor.secretary,
      phone: editor.phone,
      email: editor.email,
      address: editor.address,
      clergy: clergy.length ? clergy : siteData.clergy,
      communitiesShort: editor.communitiesShort,
      notices: notices.length ? notices : siteData.notices,
      links,
    };

    setSiteData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function resetEditor() {
    setSiteData(initialParishData);
    setEditor(toEditorState(initialParishData));
    localStorage.removeItem(STORAGE_KEY);
  }

  const contextValue = {
    siteData,
    editor,
    showAdmin, setShowAdmin,
    adminTab, setAdminTab,
    theme, setTheme,
    isAuthenticated, setIsAuthenticated,
    loginForm, setLoginForm,
    authError, setAuthError,
    phoneLinks,
    whatsappMessage,
    handleEditorChange,
    handleLoginChange,
    handleLogin,
    handleLogout,
    saveEditor,
    resetEditor
  };

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
}
