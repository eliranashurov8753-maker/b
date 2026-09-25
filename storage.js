// ---------------------------------------------------------------------------
// שכבת אחסון: מתחברת ל-Supabase (בסיס נתונים מרכזי) אם הוגדרו מפתחות,
// אחרת נופלת חזרה ל-localStorage (מקומי) כדי שהאתר תמיד יעבוד.
//
// כל ה"מצב" של הפלטפורמה נשמר כרשומה אחת בטבלה app_state (שורה בשם 'main').
// זה הופך את כל הספקים/עסקים/הזמנות למשותפים בין כל המכשירים.
// ---------------------------------------------------------------------------
import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEYK = import.meta.env.VITE_SUPABASE_ANON_KEY;
const useCloud = !!(URL && KEYK);
const sb = useCloud ? createClient(URL, KEYK) : null;

// כל המפתחות שלנו נשמרים כרשומות בטבלה app_state (עמודות: k טקסט מפתח, v טקסט ערך)
async function cloudGet(key) {
  const { data, error } = await sb.from("app_state").select("v").eq("k", key).maybeSingle();
  if (error) throw error;
  return data ? { key, value: data.v } : null;
}
async function cloudSet(key, value) {
  const { error } = await sb.from("app_state").upsert({ k: key, v: String(value) }, { onConflict: "k" });
  if (error) throw error;
  return { key, value };
}
async function cloudDelete(key) {
  const { error } = await sb.from("app_state").delete().eq("k", key);
  if (error) throw error;
  return { key, deleted: true };
}

const local = {
  get: async (key) => { try { const v = localStorage.getItem(key); return v != null ? { key, value: v } : null; } catch { return null; } },
  set: async (key, value) => { try { localStorage.setItem(key, String(value)); return { key, value }; } catch { return null; } },
  delete: async (key) => { try { localStorage.removeItem(key); return { key, deleted: true }; } catch { return null; } },
  list: async () => ({ keys: [] }),
};

if (typeof window !== "undefined" && !window.storage) {
  window.storage = useCloud
    ? {
        get: async (k) => { try { return await cloudGet(k); } catch (e) { console.warn("cloud get failed, fallback", e); return local.get(k); } },
        set: async (k, v) => { try { return await cloudSet(k, v); } catch (e) { console.warn("cloud set failed, fallback", e); return local.set(k, v); } },
        delete: async (k) => { try { return await cloudDelete(k); } catch (e) { return local.delete(k); } },
        list: local.list,
      }
    : local;

  // חיווי קטן בקונסול: האם אנחנו בענן או מקומי
  console.log(useCloud ? "שיווק השדה: מחובר ל-Supabase (בסיס נתונים מרכזי)" : "שיווק השדה: מצב מקומי (localStorage) — הגדר מפתחות Supabase כדי לחבר בסיס נתונים מרכזי");
}

export const SADEH_CLOUD = useCloud;
