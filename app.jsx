import React, { useState, useEffect } from "react";
import {
  ShoppingCart, Package, Plus, Minus, Check, Wallet, Star, BarChart3, LogIn, LogOut,
  UserPlus, Building2, ShieldCheck, CreditCard, Banknote, FileText, X, Clock, Trophy,
  Lock, Gift, Trash2, RotateCcw, Boxes, AlertTriangle, Truck, Scale, MessageSquare,
  Users, Send, Megaphone, ClipboardCheck, MapPin, Receipt, Image as ImageIcon,
  ChevronLeft, Search, Pencil, Save, Download, Paperclip, ClipboardList, Phone, Mail, Home, Bell, User, KeyRound, MessageCircle, Share2, Facebook, ChevronRight
} from "lucide-react";

// תאימות: מחוץ ל-Claude אין window.storage — משתמשים ב-localStorage של הדפדפן במקום
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    get: async (k) => { const v = window.localStorage.getItem(k); return v == null ? null : { key: k, value: v }; },
    set: async (k, v) => { window.localStorage.setItem(k, v); return { key: k, value: v }; },
    delete: async (k) => { window.localStorage.removeItem(k); return { key: k, deleted: true }; },
    list: async (prefix = "") => ({ keys: Object.keys(window.localStorage).filter((k) => k.startsWith(prefix)) }),
  };
}

const C = {
  bg: "#EEF3F8", surface: "#FFFFFF", ink: "#0F1B2D", sub: "#5A6B80", line: "#DCE5EE",
  green: "#1E6FE0", greenDeep: "#0B2A63", greenSoft: "#E7F0FD",
  amber: "#C77D12", amberSoft: "#FBEFD9", plum: "#5B4BC4", plumSoft: "#ECEAFB",
  red: "#C0392B", redSoft: "#FBEAE8", blue: "#1E6FE0", blueSoft: "#E7F0FD",
};
const SH = "0 1px 2px rgba(20,45,30,.05), 0 4px 14px rgba(20,45,30,.05)";
const FONT = "'Rubik', 'Assistant', 'Segoe UI', system-ui, sans-serif";
const KEY = "vegapp:v12";
const SUPER_PW = "super";
const MANAGER_PW = "admin";
const LOGO_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAFAAT8DASIAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAAAgABAwYEBQcICf/EAFEQAAEDAwIDBQUFBAQJCgcBAAEAAgMEBREGIQcSMRNBUWFxCCIygZEUQqGy0RVSscEWJWJyGCM2gpKT0uHwJDM1U1aDlMLi8TRDREZVY6KE/8QAHAEAAQQDAQAAAAAAAAAAAAAAAwECBAcABQYI/8QARhEAAQMDAgIGBggDBQcFAAAAAQACAwQFERIhBjEHE0FRcZEiMmGBodEUI0JSYpKx8BXB4RZTctLxFzM0Q1STokSCssLi/9oADAMBAAIRAxEAPwC1F3mh5socEpg5eTGheyEnElN8RTpndPNGAWJ+bm2Ubjg7Jc2Em9UUBYmSJCRGEPVGASp+ZA5G4boT7pUgBLlN3ZQk7+Sdx91AigJMIg7CRwhIwkRyooCRODhCQmzuiIBRQEqAAJc26TuiAO2RQEqfPmmJy1InbqhIz3KSAlTH4t0HMpCfdQO9UQBJhNnqhznbxT78qY9cIoCcQhceb1Qg7o3dUBHNspACRDsHJfFugx1RYCIAnJiPdQOdujcTjzUZ+HdHCUJ2luPJA53mnIw1DzbYRQnJy7yQgph7nemRwE7CLCieE5co3OKKAswkT9UxO+6Yuz3ICUYBLhE5yybW8i4QY2wXflKwi5ZFt3r4QfE/lKOwbhNeMtKupO+yDbon5U/KqUAUZCThCSk4oH5KKAsS6lIdyb7yWegRgFiYuz3pFIjCYHByjAJUnOx3oU5OShJ8kUBYkTnvTOG4SLvJM1yMAsyk47eaE7DySPVEpACVJCQn7+qBx5kQBNTuO3mmJ802EgOiKAsQAcvVOfdCQ67pjnw2UkBOTE77IS7fyRc2yRaMJ4SoObZBjdGc5QAjCMAlTk7eaFwwkT7yBxz4IoCamO43QZ36Ik2UcBFQF26WMuTloyhcfJFASJE/RRE57kbuiE4x3owCUIXeqEnzTnp5ISd0UBOCF3qgJ7kQKEnB80dqVBnHehKkJ+FN37IwTkHcVPbHEV8J8z+UrHx7qybdtXQ58T+UooG6R3Iq6cwUZdnvTEnxQk+apYBRE5KZLGG7JicIwCVI+SFIdycnKMAkTA8qHCclMD5owCxJLPmmIykdkYBYmPVNjfKIDcIeozhFAWJAZwhIwiHclzcwR2hYm22QcqkLfog+6igLMpsdEzneSLKZwyMooCQlI9PNR5OcqTm8kJO3migJUBIKHJwjDdihI2RwlTF3khxkuGEQ8EIKeAlUZblDjdSEIMqQAnZQEFwTOHL5YTk+SZ3qigJwQZwEJO6chC4owWAIXHG/3UARE+WUOUYJ2ExcELj5pEhATv0RQsSOw6oSfNIBMfVSAEqEuTE+achMOqKAnIc7FTWw5r4fU/lKj2x1Utu2uEI8z+Uo+FjuRVvzyp02O9CSqWAURGPdCBIOyUkYBKkDg7pEgYQkY6pNG5RgFifIyhec7pz4JiACigLEzUQHUodk5PcjAJE3glypOHKPNIIoCxPhMRhGUH3VIATcpgMIcbqTGUxGE9oWKMjZM3KkPRM0dEYBYmA6oMI8jwQuJRQFiAgYQk92EZQnYooCXKEjPco8BSHp5IXeiIAlQDphCQMo/kgc5GaE4KN43Q580TunmgceXojgJwTEeKE4TOduhyigJ6fGUBHgnyheQjALGoCFGT5IifFMfRGARAhI5fJMPVMT5pgQjgLMJyzbyQkIi7fogJ3UgJcJnHHepLYf6xh9T+UqB7lkW3e4w+p/KUQc0hGxVyJyg+JH3eaYnuVLAKGgJTpimRmhKiBymIymLvhTdXIwCxOUxKQOCkTjyRgFiYhIDzT4JR4wjBISog5P95LO3ml8yjALMpcybuSTkIoCak7OEJbunJx3pvmigLE6HfxT/CmPqiALEiT80JUmEJ370cBKoz6JnNUobzISzzRAs1KJwUbhhTcqdrADkqRGwuTS7SoeTyUbsZ64Q1NTy5GQFk2zTlzvJzS0dRMD95rDj67BdVQWCprT6AXM3PiShtTNdS/SsYsHXIx6qN7QD3K1wcIL7IRziGAf/umA/DdbCPg1Wn/nbpRxeOGud/ILfng6tHLf9+1cYelDh5vrzD9f0yqCYi7vymczZdIZwdP3r5DnwbTOP8SETuDjgCW3yHP9umcP4FR3cKXRvKL4j5o8fSjwq7Y1X/i/5LmDxsoycnC6HU8Hrlj/AJPcKCo8iXxk/wCkCPxWjruHWobZl8trlmjGxfTOEox/mkn8FrZrNX028sLvLP6LqqHjLh+4ENpq1me4nB8nYKq5IahefNHURuikdG9rmSDYscCHD1B3V34ZcODqGdt0urHMtEZ9yMkg1Lgeg7+Ud57+g70GjoZq2YQQt3W1vF9oLFQvuFZJhg8z3Ad5P9eS58T7u2E2VduMdtprXrV32SCOnp6mnimbHE0NYHYLTgDYbgKjZRKmmdSzvgfzacKXZ7nHeaCG4QjDZGh3n2IweuyjJTklAT5obQtykcYWVasC4w+p/KVik7LJtR/rGA+bvylEHNI71SrkTtshJTcqQ8SqYAUZP0TE5Ql/km5kcNWJ9tkse8mDsFOd/FGATcITnOwTEnwTpIoCblIOTcxKFFkeCOAsRYx5pgOXuwljwCRHkigJE+/imKbASBHgigJqcN3T7eCX/HVPhEASIMJfNHhJrP8A3RAFmUx370JapSw+ChdNzSCNjXTP68rMZHr3fVTIKeWdwjibqcgS1EcDDJM7SB3pw3qk9zWEAkNJPTqfkO9RS1cLGcz5/e744d3enN0Hyyhp7+6Nx+z0opz/ANZjmef87f8ADCtWz9HF1r29ZVDqm/i9byVTXvpMtNt+rpPr3+zl5/IFZ1PbayqAf2Qpoz0kqTyA+fLuStvQWW1xEGsrJqwj7kAETPr1/gq3NX1Eu807Yyf33f8ABUH290Iy2V83lGwn8TgKz6bhHhq0NzVytLvxO/kqgruLuM+IDooInMYfuM/+xyfLC6TRV1ntmPsVtpoXfvuZzv8Am52Stj/St8gALyQO7Ow+S5P+2HtOWUs7/wC+4N/VC/UldH8FvH+dJ+i3Md44dphohmaB7AuNqOBOK7i/raiJ7j+Jwz8TldaF/cfv7pn3sn765M7V9zZ/9DH/AKwoRreuBxJQf6MikMv1md6sw8ioT+jXiJm5p/iPmutOuxJ2funbeXgfEuTs10xh/wAdBPF4kYcFkw61pZyBHVBp/dkHKfxW3p6mhq/Rhla5c/V8I3i3jVUUzwPDP6LqMd7HismK+FpyHEeYK5vDf+ZoIdkHvHRZLL+B3rZOoAexcwad7DhXu61NtvkfJc6KCtA6Plb749HDBH1WTJfWOhZFE0RxMaGMYzADQBgAAdAFz79uh+MlSxX1rD8WVDbaYo3mVsfpFS5ZqqeFtPJKSxvIZOB4BY/FpgqhZav+zJAT8w7+BK508eCvms6sV2nYyDkwVLH+gILT/EKhvdkrz7xfSfRbq/8AFuvdXRTWfSuGIWH/AJZcz45/mhwgPxIyduqFx91ca0K4UGdvJZVt2uEI8z+UrEJ36LKtjs3CEeZ/KVIA3WO5FXDmOMJbBNt5oXHqqXAUVEX8uyBMOifl380ZoWJFCHJzsljxRgFidJL4fNNzIwCYUzgiwhxzd2yka0u7iUUBZhAiyPBP2Z8ClgooCYm+SHOEYjPeCibGcbhGASIMIme6iawjqnDHE4CIAsRCPbvCx5K2KOTs2h0snc1oz/x6lFPHzMGXn+5GQCfVx/llCymlfGWDkpoz1bDu4+Zd3ro6Kmog3rKyTH4W+stDWT1merpI8nvPL5/vmsGorJJW5kIYP3GnH1d/IKFrZqiPkaHNiP3YgGt+p6+u62DqERPLy05HVxyT9ShdUsBwXt5vDK66DjBlqb1dopmx/id6TlylRwj/ABZ2u8VLpPwN9FnksGK2Pp3+49jB4kFx/H9FM+MSgCQul8iTj6DCzWRNeMkgfNM+n393B9CufruJrvcnaqiocfh+i6Gg4bs9uGKWnaPdk+ZyVjDkYDiNoPiQEL5HuHkss0px5KJ1Py9y0PWPd6xXTta0cgsQcxGyB7nD0WYIOYIX057wfoihzkQALCc4nr0UfU7jb0WaaR3c0/RRPpn82SD9Edskje1LpaViOYwnOFBUUlNI0l7B6gdT3ALNlgPLnBwgpK2KikkkfTmabAbE4Px2fmAR1Pj3Ld26QS1LY5perb95a+4GSGlfJBF1jxybsM+8rEiohaHdvJO+LmG1IH9PN3h6dfFG66iVuwx81iuginc5z453Hrs5pWJPRRuPu/aI8eLR+q9UWa+cO2+lbTsrNWntdleQr9wvxReK19XNRaSexmn+X+q2pvRaN5Em36A4zJuq5WM5Bs9wPgWn+S1b6wRuwXN+ZK7qkr7ZXM1U87XeBC4Cr4ZudC7FTTPb4gq+PvDa22V8HPn/ABYdjzBB/ktcM43Vfs9UxtTM4ygscxwODnOQRhb2M8sTAevKqC6TKeKOuhkjdzavTvRCJY7bPA9uAH58x/RIHwTZScgcVT7Qr/TErJtDv6zp/HLvylYpWRaf+kqf1d+UozRskd6pVzL8pcocgDt0i7B81TICiIzgISUBd5p87eaMAkSISCbO6bqcooWIvJbbSulq/WeoKOz2uNstZUu5Rzn3WADJe7yGDk/qtRkBeivY1sH2u96hvTxzCmiZSROI3BceZ2PkG/Vbe3UwrKmOA8id/AblaS81xtlBLVt5tG2e87D4ldA0l7J+kLVQM/bLZr7WkAySyyOZHnv5WNxgfit//g0cOh/9uxf65/6rqWwS6hW6y20UbQ1sLdu8A/E7rzbLfrpM8yOqX5Pc4geQwAuYH2a+HX/ZyL5yv/VN/g1cOv8As5EPSZ/+0uocuEk/6BSf3Tfyj5If8ZuX/Uv/ADu+a5ePZp4d/wDZ2P8A1z/1Uc3sz8PJGlosXZE/eineHD58y6pnATAZTvoFJ/dN/KPkkF6uY3+kP/O75rz1qf2Q7PVwPfYbrVW6oAJZFVnt4Se4H7wH/GF511joe6aCvElrvFP2FU33mvByyRpOA5ru8H6g7HBX0QOAFxr2odJQX7hrWXERj7baSKqOQDcMziRufAju8QtBcrPB1TpqdulzRnA5ED2fJdvw9xVWfSo6WsfrY8gZPME7DftGeeV42czI2GcK8aa4WVdZBHUXWf8AZsDxzNia3mmcDuMg7NyPHKrejo2TaloWSgOijeZXhw68gz9CQF1aW9GtlcefJ6nzWy4R4XiuzDWVO7AcAfNQeknjqs4elZbbds9w1F3PA5ADO3Ysm3aL0rbmAfsxtbIMf4yseZCfl0W5hZbafAgt9FEB05KeMfjhV9lXtud1PHWDI3wrihsdDT7RRAeAC8vVXEd2rXaqipe7xcVZ4rjT4w6lpnDwMDCPyrHr7Rp28sxWWOilz9+OIRvHmHNwQtS24NO2QsllY0pJbVSyjTJECPaEOnvlwpX64ahwPsJCpeteE0VJRS19gklqIoml8tFMeaRrepLHY97bcgjPeCVyeo94cw+DGc+S9L0lcaaRrg44HQriOtqCCza2qYWRAU0s0c7GDYBr8EtHl1VQ8UcPx2/FTTDDScEe1equjbjepvZfb7gdUrBkHtI5EHv5jB8crvfB/wBmKw1GlKO6aqpJK+4V0QnFM+RzY6djhlrcA5LsHck7ZwFfR7M3DouydORf62T9V0Sy1kNXbqd0GOz7NuMd2wwFnjIKkRUFPCwMMYOO0gErm6riG5VUz5hO9uTyDiAPYAD2Ll/+DNw4x/k3H/rpP9pMPZk4bg/5Nxf66T/aXUw7PehLt9kX6LT/AN23yCjfxm5/9TJ+d3zXK5fZj4bPG+m4j/30n+0tbWeyXw2q2PayyS0riPip6qRhH4rs4GRlN8JSmlpyMdW3yCe293RhyKqT87vmvJWvfYulo6WWq0ldXTyNBIt9yxl3k2UDr5EfNeW73ba21XKot1fTSUVbTPMc0EzS17HDr1/4K+rLvfaAvMHti8NaSsttBqumibFXwPFJVyMABkjdnkz44PQ+BwtXPahIQacYd3disPhzjSYSinubtTTyd2g9gOOYPLvyvFVxeKZp6ZO2PPvWlbB9rdyMaD4lXNuiLldImytpniD7r37DHUnJ7u/K1AoI6N5bC4Sszu/HxEeHl/FWb1VPwxbmlxy8/Ep1NXycXXF7IvUbz9g+axqaiZRNHK0YG+cdfNZ8Ic4Zc0565LCr5wYstPe9WF9XCyeCjgdOY3jLXP8AhZkdOpzg+C9AOqyBhrWgYxs0D+S5WltNTf8AVWzS4yfFRuKukij4Gqm2inpescGgn0sc/ccnt968ikHJ2O3Ulh/RROXr2Oqa92HNjc07EOaCCO/IwvJ15kgmvFxfStDKQ1MpiYOgZzHA9MYUO6WN1sa12vOVvuBekEcaPmjFN1fV4+1q559g7lgu+FZFqObnBjxd+UrGc7m7lk2wf1jCR4n8pXPBuyt93qlXEgeCF4T86FxVMYUVLlS5uUJN703N5I4CxIu8kuZInmTIwCRA8r2z7J1gNq4T01Y5nLJcqmSqJIwS3PIz8G/ivEro5JiI4gTI8hrcd7icD8SF9JNDWFml9IWe1MAaKSjih5R4hoz+JK7XhiDXUulP2R8T/QFVdx9VdVQRU4O73Z9zR8yFvcZKdP8AdWHc5ZoqCokp43TTMjc6ONuMucAcAZ23OFZhOBlUQ1uo4XBdR+2DZtP6juVqNirKr7HUPg7eKeMNkLSQSAdwMgrAHtp2cj/JuvH/AH8X6ridd7PHEeqqqiqfpqo7WeR0rsTR7lxJP3/EoYvZ54iYwdMVIPnLGP8Azquv4jdySdLsf4P6K9W2HhcNAMjScb/W/wD6Xo7h/wC1XYdcaoo7G+2Vtsqax/ZwSTOY9jn4+E8u4JxscYXdG45QQvLfAn2Z7tYtT0eo9TsjozRO7SmoWSCR5lwQHOLTgAZ2AJ38F6hHu7LrLXJVyQl1YMEnbbBx7Qqz4jgtkFUI7W7LQN98jPsPbtj2IjuVzr2grlHbOEuonSEAz0/2ZgPe97g0D8V0UuDRkryV7WXE6K7XWl0rbpWzRUMnbVrmnI7Yj3WZ8Wg5PgSB1RLpUtpqR7ncyMDxP7yh8OUElfc4WNGzSHH2AHPx5e9cDguUlsuAniBOAW8vjnY4W1tmsYmVAzJyE7EOOFXntdKck4UbqSNzcvAJHeVruF+Kqmxh1O1gdG7sVncW8DW/iktnmJZI0YyO5Wa58Rp45XQ22JrsbdvJvn0Cwo9WagmPP9uLQe4NGPphaAzMjHQLMtNNV3edsFJGZZXdGt6AeJz0AXQ1l4u9a/rInlueQH9FpaDhbhq0QaJoWEAbufg+8krpGhtQVd5ZVRVmDLAA4St2yCehVuNUOXAKqdipI9O250Ic2SplIdNI3pt0A8hk7+azhX7dcq37RBWfQo/ppzJ2ryVxTLbZLvO60s0w527uW5HsJ5KxtuXZ0fKDuSuY6yeb/wAQqakZ7xBggPfvsT9ASra64xUzH1E7+Wnhbzvd/IeZOB6lVnhZSv1XxEFW9pcYy+qd3gZ2b/FchxZ1Uhp6D7T3g+5WX0X08tN9OvZGGRRlo9rjv/L4he1+Ggd+xveJwNh5DuVxPusWh0jQm32qNmOUkZK3fduudqCHSuwpMIwwZXM+N/GaPg7ZLfW/YRcZ6yo7BkBl7MABpJdnB6bdy42PbgmIDv6JMx5Vv/pW49rHh/q7iBfbHDY7HUXGgoad73yRFgb2jnD94jcNH4rhbPZ44ilmP6KVod5uj/2lx9XUVgnc2IHSPZns8FdthtNglt0clcWGR2ScvwRucDAcOxehOG/tfW/WWqqGyV9lktklbL2MM7JhIztD0a4YBGemQvRTcPHMF5E4Dey3fbRrGh1HqqKO3QUD+2hohIJJZJPul3KSGgHfGTkgbBeu2tDGALbUL6h8ZdUc87dhwuJ4nhtVPVtZajluPSwSRn2E57Oe+EgMHyVE4xR0MmjKiOvjZLCXscGyfDzAg5OdtsZ38FeDIG5GcnpjxXif2tuMR1LqNumLRV89st+W1T4XZE02d25HUNG2O858Fs2zCBweRkjkO9aS2Wea9TfR4naRzLu4fPsC5/xO4jx3WV9ptBDaBu09QwbzY+63wYPx9FzWdvMMtVmj0DcpYWSyT01O54DuzlkPMM9xwCB6dyX9AK4t92toQcd7nD/yoNRa7zcpeumhdurltV/4Q4cpW0VNVMAbz3ySe0kjn+8bK28EaU0tquld07WZsLfRoyf4j6LosleQ3qqdpaB2m9OUlvkfG+UF0kjoiS0uc49MgE7ABbKe4gsG6uGzW51HRRQubvheL+OLm2+8QVVbE7LC7APeBsPgFm369stliuNZzYMNM94PnggfiQvM8EgEYBGV1filewzSVTTQvYx87msy5xGRzAkbeQXJrfRVErGn7TSMHgXu/Rae/wBorq97GwRFzQFd3RNcbVYbbPU1k4Y97/gBt+pWT2ZB6HlWTQY+2Q4z1P5SsiS01VNQuqXy008bCA4QuJcATjOCBtnCGhpg+piIIG5/gVWlTa6iik6udmkr0tQ8QW+5wGeklDx7FZUxTnAQk5XnwBb1P3puqHJTtYSiNBWIm9FJEztGyPPuxxYDnDpzdwHmdzju3KempJa2ojghHvu3c8jZrR3nyH4nAT3KrgdVtpKfLaWlywE/ff8AeefHOPkMBdDBby2kdXT7M9Vv4nfIdq0M1xDq1tvg3fjU78LfmeQ957N7NwdsJ1RxS01bywviNY2aQdRyx++c+WWtHzX0RiGI1489j3TguGu7pdnRgsoKLs2O8HyH9G/ivYPMQ3C7nhqDRSGQ/bPwG365VNceVXW3JsAO0bR5nf8ATCPPmm5Sd0Id5rCrb9bbdKIqu40tLKW8wZPM1hIzjYEg4z3rq3EN3JVctY55w0ZWfyDCEsGRgLUu1lYgcG9W8etUz9UcGp7TVSCOC60UzycBjKljifQApmtp2DgidTMNyw+RW1A5QsW5XKC2UclRUEtiY3mONyfQd/olLO8HAHKfNa6ttDLpjtyZAOgccj6ImOwoIxkE8l5y4xe1PcKd09j07bqm1yvBa641reWTlO2Y2b4z3E5PgO9ec3AzvdI5xe97i5znOJJJOSSTuSTvle4eKXCG3630XXURgjbXQROmoagNHNFKASBnrynoR0OV4gp2vDcOaQ4bFp6g94VdXqCdlSOufqB5dgHeMfvK9B8HVNBNRO+hxaHNI1b5J7jn277dm6YU55slRVrmxjlHzU0r5HyNiiYXyvwGsaMk+QC2ENmhtgE1yLaio6tpwctYf7WOp8gtzw7w9VXSdvVN27+wIfE/FNDYKcvqH+l2NHM/vv5LAtOmJLuwTyu+zUmf+ccMl/iGj+f/ALK1UlTTWOmFPRxiJn3ndXvPiT3+nQdwWnqbtK/OX4aO7bGO7Cw/2kCdzlenLVw7BbWctR7/AJdy8b8QcUV/EMmJDoZ2NHL39/7wrDLdsn3T7vejjqx2bpGOEbGjL3uOAPNVySshgw6RxyekI+I+vgsSur56wBpxHC3pEzOB4ep8z8lo+I+K6Cws6tnpy/d/zLf8J9Hdw4kf1sw6uD757f8ACO39Fn6j1G+4xfY6YFlCw5JOxld4keH/ALld29kXRgq6G73uaPGZ20rCR+6OZ34uH0XnJoa3dy9x8BLYzTfCyxQuYGTVEZq5RjB5nku3+WAqJpKuou1zNdOcuwT/ACH6r0jxDRUfDfDjbXRN0tcQPaftEnvJxv49y6xCxrImgbABFzb+SwoasHbKavuUFto5quplZBSwRulklecBrRuSfIAFdK4EHJVLM9LZqznAEboGMGeioDuPegQzm/pVbiMZ2ef0UEftCaAdO2P+lNBlx2y5w3+YGEFr2v8AVPxC2Jt1a0bwv/K75Lo7gDvhabVOrbdpCzVFyuUro6aAe9yM5nHyA7yqjqzibXQ0eNO237e97QWTznERBGxAByR9Fwe/aA1xxPuHb32rldGHZbENo2ejRsPXqtzS0BlOZSGj99i1Ze1p3Ow7P3y960HF/wBr24aphqbTpqKSz0j8xyVUm1Q9vQgY+DK85W6ft9R0Mb3EgzBzsnOwOTleptV+y79p0pWS07D+1aaEywv6c3KMlh9QDjwOF5Ys0LYdQOMhw5sLiwHvJwCPXGVPt1DD/E2se/UDyVoR3OB3DdQ63RdW5ow7tJJGxJ5n+W66NPeedxPN1OUoK7ncBndVCaqfk4BWdbap7XAuBAHeV6ANOzRlq8iuge0nUFdxcdgPBDJdeQb7hV/9qADC1dxvgiafeQG02t2MKI2EndV/iffhVS01M12zcvI8+gVZt9X2bOq1d+rJ665SyFr3DOBt3BDTvka3BY76LsIYGRRBpK6VlO5sLYwFbxdcURYX8olcGHzAOT/ALeWyWAzxHtG53/gVRHP52QR53Y0uI8Cf9wWwtYe6Znvd5x9CqM4qfSS1ji8+rsvRvBlsrYbazqhjVkrox39Ekxd0SLsrw8AvSido5kZcIm8x29EDTvhbXTdALpqCESAGCBpnkB6EDp9SQFv7VQPuFRHTx83nC0d5uUdpoZa2b1WAlbXsGafsEr3DFY9nayZ+6TsxnyJBPnnwVJfGY2jBJON8+YySrjqoPfaamdzsl87AfmT/ADVQZLs44yWjIHirD47jjoJae1Q+pEz4u5n4KsOjGWW50tVeqjeSeQ+TQMD3ZXsr2PbAbZw2qLk9pbLc6178nqWMAY3fw6ld4EmSqjwv06NJ8PdP2sNDX09FGHgfvkczvxJVnbJuttboPo1JHH2gDz5n4quL1VfTrjPUDk5xx4DYfABTl223VeD/AGmb6L7xfu+4kgoBHRtycgcoBdj5kr3V2m4PeuSXn2YNEX261dwq47k+pqpXTSuFY4AucSTgdwyei194o562FscOOeTkrecKXWjs9U+pq8+rgYGeZGe0dy8PvibI44Y36KeAvbI1sMZExIbHyA85cThoGN85xhe0WeyboGLfsrn/AONd+i3+kuA+i9FXBldb7UZa2M5jqK2QzOjPi3OwPnjK5ePh2rJAc5oHjn+Ssifju2hhMbHuPYMAeZz81bdC01fSaLscF2kdLco6OJtQ95y4vDRnJ7yOh8wVuy7wUAkwEu2wd1YzGBjAzuVCyyGaR0hGMknbluirKmOkoJ5ZCAyOJ7ye4AAkn6BfN+Z7666Stpmhxlc+XJPutaSTlx8s/wAgvZvtHa3ZpHhrWxxyhldc2upIGg+8Gn43egG2fNeG6i7fs6gbG04mqMSSHy+6PTG/qSiUFiHElzZSO9Vgy7342+C6qmvT+FbJPcWD05XBrM/hByfAZ8xhb43OntURjp/8ZUu2fUuHvHxA8B/HxWtluIdu5x+ardRdfe2O5UE1eXs6r03b7PBboG08DdLQvONfWVV0qX1dU8ve5WJszq4EMGANy8nAHmUbalsMZbG0Pd/1zv8Ayj9foqxFeeyY1r2vlib9xsnKCfHHis2DVFAdvsjnHwMhXJcSUXElWHU1qDWR/e1el+mysThR/CtvLau8a5JPuaRo/Xf9PFbQufJKXucSTuXOOST6rLiYHNK1LNUUDj/8G4f96VlUuoKKSZjfssmHEDaYqj5OjK/atchb+Y/JX23pTsAaGRsf+UfNZ9FROuNzpaRm7qiRkQH952Cvc1sr4aKCGniIEULGxtA7g0AD8AvF3DuoiruIlOIeb7LTSPnaXb4a3PL+OF6GotQvfJ8WykcOWV8Mcr39px5f6ri+ka/xzVFNTN5Bmv8AN3+4Ls1HdgSPeVL9orVLrNwdvjmOxLWNjoo8HBy9wB//AJB+qgtl4c9w95bnUmhbRxPscFuvf2l1LDL27W003ZkvxgZO+w3Uy50bxC9sfMjC47h+vgZXQzVPqNcCcb8jleBJaozEtBwFi8rmPy74R1yvbkPskaBe/dlzaP7Na79FYtNezToDS1dHXQWqSvqoyHRuuE7p2sI6ENOBkehXCst9UzDcgDxXoaTju0hpc1rye7AHxypvZ807V2vhJp6C7RFtWYnSBkueaONzi5gOdxhp6dy6dHTQs2EbQfIKOEFrEmyYcunZqawN1chhUNVyiqqZKgtwXuJwOzJyhukccNvqZHABjYnFxPTABJ/BfKi8xMqq2WQbNc9zm48CSR+BX0N9pDiFHobhXc3tlDK64MNBStzgl78hxHkG5JK+e0oaQAPhaMDJWpqqh0cjQw7j+auno/oT9EqKiQei8gD/ANuc/rj3FaOe1sfHgPe0+p/VZ2moGU8tZK9zv8TGGjJ73H9AUUsR/wCCoPtsVDbpSfimmO/k0AD8SV3nBU1VX3WOJziWt3S9I0dNR8PTuYwB78NHv/oCtrUXNrJSc4VbrLwJ7gBzZaCM/Jay4XdxJAOy08NS6RtQ8ncNIB8zsP4r1C6AQQPlPYF48t1H19TFF3kLYNhhqJZJcnMji47nbOVJHSw82A531KVMS2No5emFm0rOY7t2XmCrlqWFz3vPmvd1HHSPa2OOMeSKCh5dx39/itpamhtxp256l3X+6ViPfyN2Ultfm40/qfylchPUvlOHFdZDTRxNOkK/k7phsmLuZqEHZUEAiqYOwzKseiiIqa61H3iWRDyGCT/L6Kst+Fb3SVS0W66RH4myMf8ALBCtTgBjHXiEO9v6FU/0oukHDc+j8OfzBbC8xCrsdaz77AJQP7pyfwytdw306dUa60/bQC9lVWRhwAz7oPM75YapKivc3E4xyjqPEdCD5LM4dati4b66tl+NK6tt0Tnt5WEcwa9paQM/eGcjPUKxekawudPBdMZZkNf+EZ5qruim/llDVWYH6w6nxDlqOOXjkD4r6AipOSGjDRs0eA7knSPPcuI/4WGi3MGG3Np7waT/AHpm+1no0nGLiPP7L/6lzorqR27ZG+aeeH7sNjTv8l3HcIS4tXEx7WGje8XL/wAL/wCpJ3tZ6JAwf2n/AOD/AN6aa+lHOVvmnN4eux/9K/yXau1cm5zlcUPtaaIH/wCT/wDCH9Vg1/tgaVgafstvudY7Gw7NsYPzJTTdKIDPWBEbwzeHnApne8Y/Vd9jOCqzr/Xto4f2eS43eqbBGAeziacyTO/dY3qT5/ivNWpvbAv9a18VjtNNamkYFRUPM8jfPAAbn6rjV91Dc9XXGSvu9fPcKt3xTTuLsD90DoB6YC01TfogCKcand52HzK622cCVUrg+4EMZ3A5cfZtsPHJ8FseK/FG5cTb1LX1h7GHaClpWn3YIye7zPUnvPoFy653F9TVSTNd7oOAPLoPwVqmihYcvDizfp16HGPTKqlVp4zlwhdLyk9cD9VafRtfbVbYZ5LjOGyvd9ruWq6ROHLjcZKantlMXQxN2A7Dn+gWvNbIT8Yyo3Vsh+8s0aWe7bMuf839UD9JSN6ulA9B+qvD+2XDp5VbFTzOBuIBzpHrXSVTx0co21sg6ELMq7KWt9xkz8d4A/VaSaJ8Bw4P+WD/ADW7or3bq5v1EoK19Xw5cKI/XxELOFy5R13WVS3Z0MT5Gn3mNJaSds9344WoYIwzPK/6f70D8SQmOMPBcRnmGAAFKqamldE5upR6W2VImYdC6/wsvL6eSrqi7MhY2Lmxjruf4Bdhs1/e4tLndV5s0texZ6QQyxzc3OXFzBkHw6+Sv1m17b2Fof8AacDryxg/zVYuitlspxGHtaFsrxbr5f7m+qbA955bDsGy9Pabr2SuZgrr1hcRTNx37ryXpzjLp21uYZW1/KDviEHP/wDS6javat0VRQBr4rpkDuph/tKsbrcaInDJQV09s4UvrBmSlcPcvQVO/fqsszbLz9/hg6GhO8V2P/8AlH+0sK5e2lpKKImktF3rJO4FrIh8yT/Jcq6spifXC6lnC95OwpnfAfqV6RjfzbAqva71vZuH9kmut7rmUdKwHAJy+U9zWN6uJ8B88BeTNUe2rqStZJDYLNR2hpGBUVLjUSjzAwGg/Irh2otXXvWtzNwvtyqLpVu2ElQ4nlH7rW9G+mAFBkuTG7RDJ+C6+2cA1krg+4OEbO0A5cfLYeOT4Ky8YOLV04waoNfUNdS2ynBjoaHmz2TSd3Ox1edifkBsFSTluyIEY6J+UArS7vcXuOSVedNTw0kLaeBuljRgD9/HvUEkuNwq1d5ZZGwMZK2NzAQ5jtiDkkn0OVYKhYc0TZTkgZXb8MX51gqTUMYHZGN1y/FHDcXEtI2mlcW4OdlRKmGWUEGdn1UtHRTdk2Fh5y5wLi3uA7vqrc63QOPwBTQ0zIR7jQFZ9b0jzVVM6BsYGVXdu6MKahqmVBlJ0rVQUTm42WxZF2bRnZZBwM4Cikft1/FVVV3F9SripLeyl5KCV2yKzuzdab1d+UqCV3MpbNtdqb1d+UrUc1uOxdBJwExTc24TncqlQFGTkkkI7ZW/YbtySO5YalnZOPgTgg/VRcxbhY9TG2obynOfFdTZLi62VcVSzm0rQXu1R3egloZfVeMfvwW0rJ+xa+KXY5Wq/aX7MDmlolhfs5jtwVM2oZXQNp6l/JUs91khO0g8CfHu8/Vaqr/xJMUgPMPFe4rNcaG/0fWxHU13rN+a8EXWzV/DdeYJhpLOR7/aCtjFJHU+/TTBhO/ZTHb0Dv1+qUonhw6SnfGP3gMtPnkbKudqYWnnJ8k0F/roHkU0rmt8Mrjrl0XW2tc6Wjd1R/8AHyVmWnpTu1CxsVW0TNHfs7z+YKssEvjKHHwRvdzdD+Kr41RI45nihnPi+IZ+vVBJq+JnSgZ/mucP5qvKnomumr6mVrvh81ZlJ0tW14+vgezwwfkrE1jvFJsBJ6qtf015BtSYPlIQgfrt7c4pGk+cjj/NawdE97LtyzzP+Vbf/anZSMiOTyH+ZW8U7WtzkfNAyZjcgua0HzwVR3a7rJMgwU7R5x5/iSsWbU1S8HEoiz3RM5f4BbeHoirwfr52jwBPyWvk6VKMj6mnJ8SB81fJ52PblvM8f2W/zOy1k13hpyeZzWHuJdv+GVQ5a2okPv1T35/eKFrnu67/ADXVU/RTbofSqJXP+C0EvSbXy7QxNZ8f35K3VWpoYM8oc93dj9TutHVajnqnHl9zzdutaOuA4vPhhZjLTUTNDuQMaf3tj9Oq6qm4ZslmbrEbR7Xf1Wim4kvN2d1ZkLs9g/osY18lTtzucPMp2ksIy0k/VbmDSzZnZcHD5YH6/gt1S2ptIzlHKR4huPxO609y4vslvbiJ+t3c358lubdwpea85lZoHe75c1VobVJVuALeyz49T8uq3MGmYmMBO565d/IDdbpsIZnAx4+fzRtZ4qq7jx7X1foUw6tvmVaFt4IoKTD6h3WO8h5f1WJHRRg7t5iBgA9PoFK6FvLs1o9Asnsw1MWrg3Vc0ztcjy4qwI4Iom6I2ABQFhPdypnMICyMIHMCESXc1IAWG6IphCsvAyhcfJEaxPCxiw56Ig0YUrunRAd1IDEuEkDnJFyBzkUNT1E/3goXN8lM9ROKO0JwUZZv5JiMBGSonn3EcJQELnbnZY8jlO7bKx5Hb9UZrU7ChepbMc3an9XflKx5PeU9myLvT+rvylHaE48iuggIc7pye/vQ9VS4aoiYuUTu4qV5QuGU8LFDKBMzlePmsZ0dQByu5aqEdGv2cPQ9fkVkuZhNgjoV1FovtbZ5OtpZNK0d1sdBeYeqrIw8LUSUzZm+9I6B3hK3b6jP44Wvlt9U0kxNbMPFjs/wVkJDti3PlhRupojv2Yb/AMeSu23dLdXGNNVC13wVM13RFRPOqkmLPHf5Km1MU8e55gPMLXySzNPf9FfjbaYDLXytz3B5/VMbXEeskh+eV20XS9bdP1lO74LlT0R3Bp9Cob8Vz10tQ7x/0U7YKl/QOPlyroAt0Q+8/PkcJGhgPxc5Hh2ibJ0u28f7umd8FKi6J6/7dQ34qittlbIdqdw8z/vUoslbtlzG/PJ+gyruKWAEHkBcfE/qpsBowAGjwC52q6XJj/w1KPeV0dL0UQt/4ipJ8BhVKLSkoI55HPB68rQAPrhbGHTrGMHuMaf7RJP0GFu8J2t8dlwtZ0h36s2EgZ/hC7ek4BsdJ60ZefaflhYkdqp4yC1pA8sNH4brLZEyIENaB596QGO9GB5Liam4Vlc7NRK5/iV29NQ0lGNNPEGeAAQgI2jokRjyTZ5VDDVORFqcAIQ7qiLwFIDUmEi5A52e9C8+SAuRWNTgE7j5ICfJIHrlC93N0Rw1Knc5RucUi7lQ83mjNCcn58DcqIuyEnOB3QEkBHATk5OFG5ydxyo3FGDU5MSmcUOfNMTlFATkLioydyETjhB0JRwE8BA93KFjSuyVO/fKxnuyjNSqF/vErIsx/rWn9XflKxSVk2f/AKUpvV35SjtCwjYrobu9BkY70zncyZUsGqKkSmcUxf5JiefGEQNS7BLA8VHjZSb7oS/uwUURpMoS0jvQuBaeqkJDT03Uc5BHkjBulOULpBnonaT0G69IaT4A2PW3s80t4oKMR6slhlnjqe0cO2cx7ss5Ttu0Y2GxwVqvZn4I27iBcK+6ahpjNZaYCmjgkeWdtUHBPeM8o7h3nyW1Zb5y+Nox6YyD2Y9vguWfxFQxw1MzifqHFrhtknOBjfcE8uXI5XCDE7wS7Eu7laOIVvpLDrjUFvo4+xo6WvlghjznkY07N8Tgd5XbeFHA3TeoOHNLJfWcmp9QR1M1n5nuaWMjZ7pDcj+8fVEgpHzSOjbzH+nxPJSa2709BTR1UwOl+MADJ3Gc+AAJPcAvNDmFmdkIdzHos650c1L9pglYY6iEujkaRjle0lpB9CCF6K1VpzhRw001pOpvmj6i5VV1oG1DpaerLcODWlxOXDcl2dlkVOZA52oAN55z2+4otZcmUbomCNz3SZwG47Bk8yByXm4RlwynMZA6LrnHbhxY9Fy6du2n3zRWi/UhqoaOoJL4SAw433wQ4bHOCDuVvJeC9PqXhDoKr07befUl6qTFUVJe4tDMSEudk4a0coJwO7HUqYKR2pzBzaM+PLl5qJ/HKUQQ1DshkhLd9sEBxOrfbGkg81wFz2tckJg34V0fjPbdFaPdSaX05ALleKJoFzvpkcRJMOsbGj3Rg/EcbYA67q48JdD6MfwMuWsNRaXn1JWUtyfTdjRueJXMLo2gNa3bA5iTt0WMpnOeYw4ZAye7bn2Ik13ihpWVZjdh7g1owATk4BwSMA+0g45hcLazn3OU5hLd8FwV+4k3TR1VR2+LTWjLnpSqEhfK64ufiaPlIwA49xIOQulcDbbwv4h1Vq0zXaSnffTSOknrnTuEcj2DLiMOzvnZSGU+p2gOGff8kyou30Wk+mSQv0jOR6OQB2n0sY8CSvORONspi4Aeav8Axdumg3h9u0nparslwpK18c1XPP2jJGN5mkAEnGSBv4Bc55/dwmlul2nOfBbalnNTEJTGWZ7HYz8CR8VM48x2GUD8juXdODGjtEz8INT6v1ZZX3g2qq5QIpixxZys2G4HxOJyVJrLQ+hdXcHLhrvRdFVWM2qo7Cqo6mXtGyjLQcHJ3HO0gg+IIUttOdIcCOWcduFp3XyFtSad0b8B4ZqwNOo4wOed8jfC4HzAoXOXVdBaFsd/4HcR9RVdH213tBYKOfncOyyxpO2cHqeoK5ExxPUJdBbpz27rcU9XHUPljYDmN2k578B23swQpHlDndda9n3h1a9d6orqrULM6as1E+rryXOaMAHlGQR4E7b4b5rV+0Xw8ouHGuom2aMt07dKWOtt5Di9oYcB7QSSTjruehR+rOjX2KM26U5r/wCHb68Z9nhn72N8Y5brnXKXDZQv9zY5C7NwX4Y6erNGXTiBrqonZpigk7CGjpiRJVy5AO4wcc2wAIyc5OAsvVVbwU1XpG5utlsuGjb7St5qNoBlbUnua5oJaR45ILRuCpDYjjVsEB95jbUOgjie8NIa5zW5a0nsO+TjIzgHHauGF22yjJ7iu2+y1oDT3EDUl/p9R203Kmo7YKqOEPc0h4kwcFuCTjIWDru98Mn6UuDLTwuv1hukkfJS3Gr5xFFIcYJycdMjCIIyGhxOER12YKx1EyFznN05I04GrlzcD44C468BAX96TZAenREQeuDlPaMroEDio3g9UTnYPQqMu28kUNKdsonu81C9TO6bLHe0qQGJchRO71PZ3YulMPN35SsZ+7lNanf1lBv3n8pRQEp3C6GR5qIu81IR7qHG3RUs0KGt5pS7Wm1mpddrT+0+0a0Rkux2ZBOdiRnORv3YW3/pPpZxyNNNA8yP1VLCRG/kujpLtNSRCJjGYHexrj5kLla/hqkuNQ6olkkDj92R7R5BwCtcuqNO4PLplg/zh+qxnahsbhkabH+kP1Vc6NSMg71tGcRVI/5cf5G/Ja7+xtB/ezf96T/Mt46+WQc+bC3cEAcwG+PXb1VcgOXYd0z08EbuV58UxaR3LXVtwmuDmuka30futa39F0NstEFpa5sLnnV997n/APyJwvS1v1tNw/4E8MLxSOD5aS6vfLEHbviPaB7SPME/PCsVv4nafvHFjQ+ndHmOLTsVTPcap7MtbLUSRvcRvj4eZ2e7JwOi8kvrDycnM7k7gXEgegQtrXRkODiw9zgSCPmEdtc5ukAbDT4+jjt7M4GVppOGYJesc9/pu6zB7PTzjIzuWajjccyukX7S7tccdrnZo3cra29StkfzABsfN77s9PhBXZ9ecYOGVg4iW0VEV8mr9KYpaR9tkApmAAZGM+9tsfHovJ/20kkhx5j1dk5PzWC+Mlzie9IypdGDoaMuOd9/Aefap09kZVui6+Q6Y2aQBtuRgknPaNseO67P7T+n6az65dfLc5kto1FSiuhdGQQJC0doMDoSC048yu3az4t0fD608NYKy02+6W2poI/tcs8YklhYGsBLM5AIzkgjuXivD3gAuc4DoCScLKFVIGhr3ucGjADiTj0Ro6ose9zW4L8e7fJ80CawMqIaeCok1CEEcsFwI0jcHYjbffJHYuz+1nFeX63o7nPcGXGwVVODaJYABHHGcEx4HQjYkncgg92FfaHi9cuFns3cPK+1Npp6iafs52z4cezD3uc0DOxdgDPcvK9VUunYGl7iB0aXEgeg7lC1jiAMuLR0GTgfJOFQ4SPkZsXDv5cvkiGxRTUdNSVBDmxHPq4DgA4YIzsd8k9pHLddx456EtV1pqPiNpLlfp+8tEtXTsI5qOoJ97LeoDjkHuDh4FdK9n119b7PN0p9J11JQ6gN3eaeSsc0NDcxc+xBG7QQNl5QbM6OMtDiGnq0OOD8kIqnNaQ17gPAEhSGTCOQyhuMjfBxue0dyHUWWSpoWUUk2rQ4EFzdXotOzXDPpbbE7ZHYuwe0LaOINNDaLtre52u5APdR05oHty3mBeeYNHT3Tv6BD7I9xazjZQOkc2NgoakEvcAOg7yuMTyOlcOZzjjuJyoiHNdzNLgfEHCQSESiQA7EHc5+Knm167a+3ucBqa5uWt0gZ7m5P67reaolbLqW84wR9vnIIOR/zj1qH53whYOUYTOfypcZOVu42aGhvcvSnAnV8ei/Zz11c5KGjuj6auDxQ1wBil91mxHUgZz6hc14h8fr1xE05HYGW+2aesgeJJKK1RlomcDkFxPcDvgAbgZ6Ll73vcCwOdynqATg/JGwFg2CkCVxaGDYAY8Vo4bJTR1UlZKNb3O1DP2dgOWcE7ZzjO69HezxpqfVnAniXYaSWCOvuU0cUBqJQxueyacuz0Gx3wub8RuCN94X2ulrrvUW2WKol7Boo6jtXA4JyemBgHdc+ZUOjBw57c9eVxH8FFNVue3Be5w/tOJR8sLQCNwMZz/JLBbqmCslnjmHVyO1Funf1Q3Z2r2DsXqHS9bpDhJ7PtJS6ubWyTaxkdJUU9seBUCLALGkgjDQ3GR3lxHioOJUuluMXs/R1WkxVtfoyVsbILkc1H2flAcM78w5SCP7hHcvK72uldzOcTjxOVPHO+NhaHOAPUAkZR2yahp07Yx+z47qEOHsTiqE7ut6zXn7PdjTn7no5zn9F6F4PVdo4ncFLpwvqbtT2e/RVn262yVTuWOc8weB54dkEdcEEZwtdevZon0Xoy73nWGqLXZ6iFn/ACGkpn9uah/7p2B97oMA4O52XAJm8zs+G48lK2eWRwMsskr2jAMjy8geRJ2Tg8bAjONlM/hNRFM99LPoje7W5ukE52zgk7B2N8g+xei/YiqnU+t9UkSxwTPtDRGZXNGHdptv06rN4y2XjNcOHV0k1ZqCxV1kpWtqp6elkj7R3KQRy4aCSCRtleZpX824JB8jhQBz2u3kcR4FxRmkhunHxQ5LGX3I3Br25OnZ0YcRp+67UME9+O5MyFw2PcdxnqroNT6Zbyhuk27NwffByQN9yd1UZDncKDtN9lsaOrfR50AHPeMqbdbJT3kME73t0/ce5nnpIyrk7VemAf8AJNhH94fqpI9Y6Taff0ew/wCcP1VJJyfFC48vktn/ABWZ32GflC0f9jKDGOtm/wC9J/mV7l1jo9wA/og0ejh+qqurLraLrPTOtNp/ZLY2OEjebIkOdjjJxgZ378+S1DnE9yhd4pstfJMzq3NHuAWwt3DNHbZxPDJIT+KR7h5E4WPJ1KktX/SVP6n8pUb9lJavduMHqfylQWhdcdgujdUJdgJZ5j6IS9UsAoSWB47JnOycIXOACDnOUYNTsJ+ffCjmOGEjwyjDg05UUr8MefAEj6IoasC6LbOCVxrIoHs1JpdvbMa5sT7q0PBOCBjGx3xjxWRT8DdQ1Oo75Y3VFqpq6zRNnq3VNaGMbG4Ah4OOgHU4GNlZb1whpKviDpS3WSjit9s/ZNHdLpVSSYZEwuDpJHOce8NwAPJZ1Bq2l4o6v4uW+1ywsrb/AELYbQ6V3IZ2wuA5ATjBc0ZG++VvW08bTpc3Bzjnz2J2278D3rh3XOqc0yQyAt0hxy31MvaATgn7Os+AyuVav4WXnSllF7NRbbtZjMIX11qqhPHFIRkNfjHKT3EjBWLdeGt5tOp6HTtSKf8AaNaITAWS80bhMMsPONsHv8F0an0zX8NuCGsKTU0H7PuGoainhobbK4Gd3Icvk5ASQANgT128Qr1Foe51NDwx1XqOL9gNsDTDdpbk9sbuwgPPC/GdydmgDfKeyka840kHAJHdvg/DB37ER96dAC5z2ubqe1rh9ohgcCBnfDssOOZxyOy5nS8ILXNousoZrrZbdragvM1LU/bbl2TOwaBsPHc7HHcqfrXQNx0FdILddHUr5poG1Mb6SbtWOjdnB5gBnO62Fm067jJxVqhG5tNS3CsmraqokIAhpufL3uz38pAA8SFj8U9Zxa01tU1lI0x2mmYyhoI+9tPH7rM+bsEn1SFrNGvTjfA9uOZ/RbKmdUtqhC6TUC0ueCPVJxgA55E6sDuCzrJwpqr1aaavjv2nKSOoj52w1dzbHK0ZIw9hGQduiKr4H6m/plQaZjNvlrq2jNfFMyqBpxAM5eX4wNge7vC21y4Wx6g0rw0isFA39s6ggqH1k7ngA8r2jtDk4aGtJJwrRctb1VTx1NLo+0w6qordZ/2E2l7XkbPC1mJntkztuSB16KUImEAObjdvLfORnu7lrn3CpLnGnkB9GQ4cANOh2kZOrGCQcZIyAeWCuW6m4Q3zTOn5b42rtd5tMMgiqKiz1gqPs7jsA9oxgZ2BxjKskHs/3w0dulku2nqaS4QsnpIZ7k1j52OGxGR39PVWh+lp+HfCriY+7WaPS7L42npLXaJKwTyOLSSSDkkgDfJARcTtCXriudG3nSNIy42qW0U1E+WORjRRSxk84kyRygZznyRRA1m+kk4G3bzI7s9x5dqD/FZpHBvXNbHqI6wgYOGNcB62nIJcMg4Ok43XMIOGt2qNS3GwVUtvstzoADOy7VYp2dcYa7o4kYIx16odUcJ75pKwi9yVNsuln7UU8lZaqttQyGQ7tbJjcE9xxhdd1T/RriBxN4l1L4qW9Ms+lwynqHHmZ9piaGukYc4JByAd+iouihy+zhxJaTl/7Stz2tzufeG+EroW5IG/rYPgpUVyqXsjmO28Qc0t/vNIODnO2c7j2LGh9nrVAfTuqq2xW+mq2Ruo6uquLWxVheAWiI4y7AIzsACRvuqXqTTVfpG9Vtou1OaW4Uj+zmidg4OMgjGxaQRgjqCF1/irou86ou2kdNact0lwdYtOUgmjie0CJ0nvOJy4AEn57DwVY9pm4w1XF66sjlZP2NLSwSvjcHASMgbzjbqR0PoivhaxpOCMEDx7/JPttxmqZo43va7W1zsAYLcFoaTufWBzv7tlrLDwXvV+0rR6jZd7BRWqpeYmPr7gI3NeP/luBacOwD543UNZwb1NTa0tOlnxUhuF2YJKGoZUB9NUMIJDmyDIPwuHTrjxVj1JYazTXs12OmuUJoaqt1E+tgikc3nfCYDyvxnODkdfEeKvul5Q3WHs4F7gOW2ytcSemz8A+CK2NuQ0jB2+JAUaW6VcTJJmPa5uZQNvuNc4HOd924Pf7FxTSXCe+awdeW259DNWWsyCWhfUhk8gYMudG07vAwdx3rYae4MX/U2nae/0b7dHZ5JHxSVlTWNiZSuZ17XPwZyMdSdtt10fgBpa8Dipd9T/AGFzdPwm6Qury9vJz++OX4s5zjuVVjpqqv8AZ1tdptMLqi6ag1S8NgjIDpRFGOXYkDAx37beSKyMNaDg9v8ALH6oktzqHVDoY5G4Bj3xnTqD9QO/Nobq+B2VV1Jwlv2nr3Z7fWTW1lPeATQ3RtY00MwGeY9rjDcdCCO8eKa7cFb3ZNXU+nLhdLBSV8sLpyZLkzso2tweWR2PdJDgWtPULoGuLZU6I4YcJLRf6ZkVzpL3PVz0Ezmvc2AytPvBpIwR8is6r0ZZ9Re1lqmjvtPFc7dLDVVrI53EtJ+ztdHuCPhOQBnvwidUCeW+R8QkZdpwwvc8FobKchudXVv0gjfG4IOM47jhc8vXBS9WbTlZe46yz3ugocGsdaK9tQ6naTgFzQAQ3PeqhYLE6/XmC2x1dFQyTlwE9fMIYW4BO7yMb4wPNdF4M1MbtA8XMFrebT7ABnGf8a7b8VWOEWm7fq/izpmz3anFZba2s7OenLiA8cj3Y2II3ARA3ONI5/NbRlVLEyqFQ7PU7ggYONAdyzjIz3jK2sPs93+7SSx2u86ZulRHE6Y01HdmySlrRkkADfACrlPwxvTrdpWv5acU2ppzTUJ7X3hIHBrhIMe7jbxXQeE9sZw3l1rr6tZHRWujZW2qzwOeOeoqJHlgYxueYhoHUqz8Mqx964L6fltOnhq/VGlL1JJBQfa+x7MPAc2ZzBu9oP3QRuN0RjBscY/f+q1s1zq6cuIcHsa5rc4Ddy12QSXY2doyc9pHNceqOF94pIdZSP8AsvZ6TcI7i4Td5dygR7e9+C3H+DpqgPpn1ddYbZR1kUctJW1lxayGq5xkNjOMuIGObbAyN91YdWz3LQXCvXbdWSQU2sdbV8c4tcUjXSwxRkvfI8NJDAT7oBOein4u6RvmuqvQ2lNOUDrhNatLU8joYXtaWdockklwA6DzRgwd37z8k9tyqnOaOtY1hJGvGW4axpLgSQMayW55Y8Fz6k4K6uq9ZXfSQpKePUFupzVOopKgZnZgbwno8kEYA7isq8cA9SWbTdfem1lnukVvAdcKW3VrZ56IE4Jkb3AHY4Jxg+C7vcqmGg9pa53HtI5J7BokmVzJAQydsOCCQeoz+K51wK0vedM6O1vqq+0L6CwV2mJmQ1dQ9nLUvfjlwObJJOcbfxRGsGfNR23qqfE2cuaPRiOnHrOfnLR6XcMjmd+0DfhDxyHB6qN25RFp5RnrgKMuwcJ4XfqOTuUbz1CNztuqhd4o4CcgftkqW1b3OA+Z/KVA85zlTWo/1lB6n8pRNKQ8l0FvVCXeacuKH1VLgKGmcefzQdCpO/CHG/RGaEoQkqJwD2lvTIIypHd5CHl38kYBOVl4i6+m19X22ofRiiFFbYbcY2SlweGZ947Drj0VVaA1zXNJa5pyCDgg+IREoeqkEl7i5/MoEULKeMRRDDRyCmkrZppBJLNJNJsOeRxc7A6bndSXa9V16mdLX1k9dI48xdPK5+/jgkrEKb4kQA8kTS3IOOSkhndFnlcW5HKeUkZHht3IJXlyBJGAS4Vl1NrybUGkdJWMUv2UWCCaETskPNN2hBJOwxjGMZOVW6Sd9KR2bnRnoORxafqFGRv0SHmj51HLufyQ4oGQt0RjAyT7yST5kkrJlrJJTzSOdI8DAL3knHhkrHbVTxMeyOoljZJ8bY3uaHeoB3+aHYlIlExlFDRhBTc0BdyvLA5vK4NJAI8DjqFOapzWFjXODSckBxw7HiO9QEjGyFxCMBhO3WSa+fmJE0zXHqRK4E46b5UI+IuO5JySe9MXIScIoCQADkpJ6iSblD3vcAMAPcXco8s9EBnlPZkSyAs2aQ8+56eHyQvPTdBlGwEu6kjqKiKNzG1EzYySXNbK4AnvyAVGHPbylsjxyHLcOI5T4jwQ56J0QNS7qV9VJJ70j3ynGOaRxcceGSopZ5JH8/aP7TGC8vPN9eqByjDh3I4CXdHE90IcGuLQ4YcGkjmHgfFWLh5rc6C1xZtQimFabdMZhTl/IH5Y4Yzg4+LPTuVZJ5hlA7ZHbtyQ5YmTxujkGWuBB8CMFbG6XD9oXGrqi0sFRUSzhnNkML3FxA+uM9+FrWTTU8/aQyyRSYxzRPLDj1CRd5oQQi47ERoDWgDkhe1zpXSPcXvccuc45LvUlZLLhPG7nbNK12OXIkcDjwzlY7nHKjB5QjMGETBdssiSpk5pHc7wZAQ5weQXZ65PfnzWO6ondEIXTyuhbgiMyEtGOm2cJc+Rnoh90hF05WYwkXbICe9SEqNztsIoCXKjLiSo3I1E92xRgFgUch6hS2p39ZQY8T+UqF5witW9yg7tz+UozQndi6DzJF2EIcMIebO6pcBREedtknOUfOe5NlGATU/zQk74TnZqBz0YBPTkIOZL+KR6owCRNnGEOSkTlNzBFAS4SJTZKYuyUJKMAswlzeaRd9EwOUDX4RgE9S8yEu3QcxTB3NsigJmE5PehPiU3NtlCXYOUYBLlHkg7lCH74ymJy1MXbeaMAnhGXgd6Eu81E49UsorQkwic8eCYP36KN/XqmDiOiMAswpC7lOEBflDnzQuRQEqPKAuTF6AnfqjgJ6MuwEBd91J5yhHUooCan5kLnJHohO6MAnpzgpicNSJygJRgEgKJx5Rsoj0Tl2QgeeZGASpnHAUDzjKkd0UDznKMAnYQOd35U1qdi4wDzP5SsaR3VTWk5uUHqfylGASdivvVP6o3Mc37rvTCHldj4HfRUsAooQEpicIuR2fgd9EPI9+/I76IwCVDn7yYnCcMf+476IS12fhP0RgFiXMhJwn5XfuH6ITG7vYfoigJUxPghPu+aJzHAfA76ITG4dWn6IwCwICcNSL+ZP2b39GO+ifsH/uO+iMAlUfOmL0ZgcPuu+iYxvH3XfRFAWKPmwcdUxej7N2d2n6Jix2fhOPRGATkJd7uyY7jdIsc3bld9E3Zu68rvoigJMIOfuQmTfZO9j87Md9EBa7OOU/RGATkXNzqLmUhic77jvomdE/HwO+iMAlQcyYnO4TmN4+4folyvP3D9EYBIgLtskJsuciDHY+E/RM+Nw35XfRGATlGSmLu5HyOJzh30Tdi7Hwu+iKAlTcyEnG3gnMbj90/RCWvG3KfojALERcoi5FyO/ccPkgc0gfCfojAJUnPSzshw4n4T9Ei0juP0RgEqB570L3Z6Iy1x+676KNzHfun6IwCVRvJJUTnFSuifn4XfRRPjd+676IwCxQPd7uyyLMQ+5weRP5SseVjndGnPois7JG3WHDXYydgP7JRUgX/2Q==";
const MIN_ORDER = 5;
const LOW = 12;
const NIS = (n) => "₪" + (Math.round(n * 100) / 100).toLocaleString("he-IL");
const NUM = (n) => Math.round(n).toLocaleString("he-IL");
const bgStyle = (key, color, custom) => { if (key === "custom" && custom) return custom; switch (key) { case "white": return "#FFFFFF"; case "cream": return "#FBF7EE"; case "tint": return `linear-gradient(180deg, ${color}12, ${C.bg})`; default: return `radial-gradient(1100px 460px at 50% -10%, ${color}22, ${C.bg})`; } };
const shade = (hex) => { try { const n = parseInt(String(hex).slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; r = Math.round(r * 0.6); g = Math.round(g * 0.6); b = Math.round(b * 0.6); return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); } catch { return hex; } };
const KGL = (n) => (Math.round(n * 10) / 10).toLocaleString("he-IL") + ' ק"ג';
const monthKey = (d) => { const x = new Date(d); return x.getFullYear() + "-" + x.getMonth(); };
const nowMonth = monthKey(new Date());
const monthName = new Date().toLocaleDateString("he-IL", { month: "long", year: "numeric" });
const dayStr = (d) => new Date(d).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const PAY = { cash: { label: "מזומן", icon: Banknote }, credit: { label: "אשראי", icon: CreditCard }, check: { label: "צ'ק", icon: FileText } };
const STRUCTURES = ["עוסק פטור", "עוסק מורשה", "חברה בע\"מ"];
const CATEGORIES = ["מסעדה", "בית קפה", "מכולת / סופר", "קייטרינג", "מלון / צימר", "בר / פאב", "אחר"];
const ROLE_LABEL = { manager: "מנהל", client: "לקוח", agent: "סוכן", picker: "מלקט", driver: "נהג" };
const STATUS = {
  new: { label: "חדשה · לליקוט", color: C.amber, bg: C.amberSoft },
  picked: { label: "לוקטה · מוכנה למשלוח", color: C.blue, bg: C.blueSoft },
  assigned: { label: "הוצבה לנהג", color: C.plum, bg: C.plumSoft },
  collected: { label: "בדרך ללקוח", color: C.plum, bg: C.plumSoft },
  delivered: { label: "בוצעה", color: C.greenDeep, bg: C.greenSoft },
};

const defaultTiers = () => ([
  { id: "t0", points: 30, title: "מארז מתנה", detail: "", cost: 80 },
  { id: "t1", points: 100, title: "כרטיס אשראי טעון ₪550", detail: "", cost: 550 },
  { id: "t2", points: 250, title: "חופשה בארץ", detail: "", cost: 1200 },
  { id: "t3", points: 400, title: "חופשה באילת", detail: "", cost: 2500 },
  { id: "t4", points: 600, title: "חופשה בחו\"ל", detail: "", cost: 4500 },
]);
const supplierData = () => ({
  kgPerPoint: 10,
  periodMonths: 1,
  prizeTiers: [
    { id: "t0", points: 30, title: "מארז ירקות מתנה", detail: "מבחר טרי לבחירתך", cost: 80 },
    { id: "t1", points: 100, title: "כרטיס אשראי טעון ₪550", detail: "", cost: 550 },
    { id: "t2", points: 250, title: "חופשה בארץ (לא כולל אילת)", detail: "החודש: הכינרת", cost: 1200 },
    { id: "t3", points: 400, title: "חופשה באילת", detail: "החודש: מלון הרודס", cost: 2500 },
    { id: "t4", points: 600, title: "חופשה בחו\"ל", detail: "יעד מתחלף מדי חודש", cost: 4500 },
  ],
  products: [
    { id: "p1", name: "עגבניות", unit: "weight", cost: 2.2, price: 4.5, kg: 10, stock: 80, emoji: "🍅", img: "" },
    { id: "p2", name: "מלפפונים", unit: "weight", cost: 1.6, price: 3.8, kg: 10, stock: 65, emoji: "🥒", img: "" },
    { id: "p3", name: "בצל יבש", unit: "weight", cost: 1.1, price: 2.9, kg: 10, stock: 120, emoji: "🧅", img: "" },
    { id: "p4", name: "תפוחי אדמה", unit: "weight", cost: 1.3, price: 3.2, kg: 15, stock: 90, emoji: "🥔", img: "" },
    { id: "p5", name: "לימון", unit: "weight", cost: 3.0, price: 6.0, kg: 3, stock: 30, emoji: "🍋", img: "", cat: "פירות" },
    { id: "p6", name: "פלפל אדום", unit: "weight", cost: 5.5, price: 8.5, kg: 8, stock: 9, emoji: "🫑", img: "" },
    { id: "p7", name: "חסה", unit: "carton", cost: 2.8, price: 5.0, kg: 5, units: 12, stock: 40, emoji: "🥬", img: "" },
    { id: "p8", name: "כרובית", unit: "carton", cost: 2.5, price: 4.5, kg: 8, units: 8, stock: 22, emoji: "🥦", img: "" },
    { id: "p9", name: "גזר", unit: "weight", cost: 1.5, price: 3.4, kg: 10, stock: 70, emoji: "🥕", img: "" },
  ],
  clients: [
    { id: "c1", name: "מסעדת הגן", contact: "יוסי לוי", phone: "050-1234567", address: "הרצל 15, תל אביב", email: "gan@demo.co.il", password: "1234", taxId: "514112233", structure: "חברה בע\"מ", category: "מסעדה", pay: "check", status: "active", target: 40, docs: ["תעודת התאגדות.pdf", "מורשה חתימה.pdf"], createdAt: Date.now() - 86400000 * 40 },
    { id: "c2", name: "מכולת שלי", contact: "רונית כהן", phone: "052-7654321", address: "שדרות ירושלים 40, בת ים", email: "makolet@demo.co.il", password: "1234", taxId: "039221144", structure: "עוסק מורשה", category: "מכולת / סופר", pay: "cash", status: "active", target: 25, docs: ["עוסק מורשה.pdf"], createdAt: Date.now() - 86400000 * 30 },
    { id: "c3", name: "קפה נועה", contact: "נועה בר", phone: "054-1112223", address: "הבנים 3, רמת גן", email: "noa@demo.co.il", password: "1234", taxId: "058993311", structure: "עוסק פטור", category: "בית קפה", pay: "credit", status: "active", target: 15, docs: [], createdAt: Date.now() - 86400000 * 20 },
    { id: "cP", name: "פיצה רומא", contact: "מריו רוסי", phone: "050-9998887", address: "ויצמן 8, גבעתיים", email: "pizza@demo.co.il", password: "1234", taxId: "515667788", structure: "חברה בע\"מ", category: "מסעדה", pay: "credit", status: "pending", target: 20, docs: ["ת.ז מורשה חתימה.jpg"], createdAt: Date.now() - 3600000 * 5 },
  ],
  staff: [
    { id: "a1", role: "agent", name: "דנה (סוכנת)", email: "agent@demo.co.il", password: "1234" },
    { id: "k1", role: "picker", name: "משה (מלקט)", email: "picker@demo.co.il", password: "1234" },
    { id: "d1", role: "driver", name: "עמית (נהג)", email: "driver@demo.co.il", password: "1234", roles: ["picker"] },
  ],
  orders: [
    { id: "1024", clientId: "c1", date: Date.now() - 86400000 * 6, status: "delivered", driverId: "d1", paid: true, pickedBy: "משה (מלקט)", items: [{ pid: "p1", cartons: 40, actualKg: 402 }, { pid: "p6", cartons: 30, actualKg: 238 }] },
    { id: "1031", clientId: "c1", date: Date.now() - 86400000 * 2, status: "delivered", driverId: "d1", paid: false, pickedBy: "משה (מלקט)", items: [{ pid: "p2", cartons: 35, actualKg: 351 }, { pid: "p7", cartons: 20 }] },
    { id: "1038", clientId: "c2", date: Date.now() - 86400000 * 1, status: "picked", paid: false, pickedBy: "משה (מלקט)", items: [{ pid: "p4", cartons: 40, actualKg: 611 }, { pid: "p9", cartons: 20, actualKg: 198 }] },
    { id: "1042", clientId: "c3", date: Date.now() - 3600000 * 3, status: "new", paid: false, items: [{ pid: "p1", cartons: 6 }, { pid: "p5", cartons: 4 }] },
    { id: "1043", clientId: "c2", date: Date.now() - 3600000 * 1, status: "new", paid: false, items: [{ pid: "p3", cartons: 8 }, { pid: "p8", cartons: 3 }] },
  ],
  messages: [
    { id: "m1", clientId: "c1", fromRole: "client", fromName: "מסעדת הגן", text: "אפשר להוסיף ארגז עגבניות למחר?", ts: Date.now() - 3600000 * 4 },
    { id: "m2", clientId: "c1", fromRole: "agent", fromName: "דנה (סוכנת)", text: "בטח, הוספתי 🙂", ts: Date.now() - 3600000 * 3.5 },
  ],
  broadcasts: [{ id: "b1", text: "מבצע השבוע: 10% הנחה על פלפל אדום! 🫑", ts: Date.now() - 86400000 }],
});

const secondSupplier = () => ({ id: "s2", name: "מאפיית הבוקר", category: "מאפים ולחמים · חד פעמי ואריזות", domains: ["bakery", "disposable"], regions: "ירושלים, שפלה, מרכז", status: "active", biz: { taxId: "302998877", address: "יפו 100, ירושלים", phone: "02-5559876", email: "" }, invoiceSeq: 2000, owner: { email: "admin@boker.co.il", password: "1234", contact: "בעל המאפייה", phone: "02-0000000" }, brand: { logo: "", tagline: "טרי מהתנור כל בוקר", color: "#B4791F", borderW: 2.5 }, sub: newTrialSub("premium"), cats: ["מאפים", "חד פעמי"], features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(), products: [ { id: "b1", name: "לחמניות", unit: "carton", cost: 0.8, price: 1.6, kg: 4, units: 24, stock: 50, emoji: "🥐", img: "" }, { id: "b2", name: "חלות", unit: "carton", cost: 6, price: 12, kg: 6, units: 6, stock: 30, emoji: "🍞", img: "" }, { id: "b3", name: "בורקסים", unit: "carton", cost: 2, price: 4, kg: 5, units: 12, stock: 40, emoji: "🥧", img: "" }, { id: "b4", name: "עוגיות", unit: "weight", cost: 15, price: 28, kg: 2, stock: 25, emoji: "🍪", img: "" }, { id: "b5", name: "כלים חד פעמי", unit: "carton", cost: 20, price: 38, kg: 3, units: 100, stock: 40, emoji: "🥡", img: "", cat: "חד פעמי" } ], clients: [ { id: "c1b", name: "מסעדת הגן", contact: "יוסי לוי", phone: "050-1234567", address: "הרצל 15, תל אביב", email: "gan@demo.co.il", password: "1234", taxId: "514112233", structure: "עוסק מורשה", category: "מסעדה", pay: "credit", status: "active", target: 15, docs: [], createdAt: Date.now() - 86400000 * 10 } ], staff: [], orders: [], messages: [], broadcasts: [{ id: "b2x", text: "מבצע השבוע: 10% הנחה על חלות 🍞!", ts: Date.now() - 86400000 }] });
const AREAS = {
  "מרכז": ["תל אביב", "רמת גן", "גבעתיים", "פתח תקווה", "ראשון לציון", "חולון", "בת ים", "אור יהודה", "יהוד"],
  "השרון": ["נתניה", "רעננה", "כפר סבא", "הוד השרון", "הרצליה", "רמת השרון", "כפר יונה"],
  "ירושלים והסביבה": ["ירושלים", "מבשרת ציון", "בית שמש", "מעלה אדומים"],
  "שפלה": ["רחובות", "נס ציונה", "לוד", "רמלה", "יבנה", "מודיעין"],
  "צפון": ["חיפה", "קריות", "עכו", "נהריה", "טבריה", "עפולה", "כרמיאל", "נצרת", "קרית שמונה"],
  "דרום": ["באר שבע", "אשדוד", "אשקלון", "אילת", "דימונה", "קרית גת", "נתיבות", "שדרות"],
};
const DEMO_TEMPLATES = {
  veg: { name: "ירק+ שיווק השדה", category: "ירקות ופירות", domains: ["veg"], color: "#1F7A4D", cats: ["ירקות", "פירות", "עלים"], tagline: "טרי מהשדה כל בוקר", products: [
    { name: "עגבניות", unit: "weight", cost: 3, price: 6.5, kg: 10, stock: 60, emoji: "🍅", cat: "ירקות" },
    { name: "מלפפונים", unit: "weight", cost: 2.5, price: 5.5, kg: 8, stock: 45, emoji: "🥒", cat: "ירקות" },
    { name: "פלפל אדום", unit: "weight", cost: 5, price: 9, kg: 6, stock: 30, emoji: "🫑", cat: "ירקות" },
    { name: "תפוחים", unit: "weight", cost: 4, price: 7.5, kg: 12, stock: 50, emoji: "🍎", cat: "פירות" },
    { name: "בננות", unit: "weight", cost: 4.5, price: 8, kg: 10, stock: 40, emoji: "🍌", cat: "פירות" },
    { name: "חסה", unit: "carton", cost: 6, price: 12, kg: 3, units: 12, stock: 25, emoji: "🥬", cat: "עלים" },
  ] },
  eggs: { name: "משק הביצים", category: "ביצים · מוצרי חלב", domains: ["eggs", "dairy"], color: "#C79A1E", cats: ["ביצים", "חלב"], tagline: "ביצים טריות מהלול", products: [
    { name: "ביצים L (תבנית 30)", unit: "carton", cost: 18, price: 32, kg: 2, units: 30, stock: 80, emoji: "🥚", cat: "ביצים" },
    { name: "ביצים XL (תבנית 30)", unit: "carton", cost: 22, price: 38, kg: 2.2, units: 30, stock: 60, emoji: "🥚", cat: "ביצים" },
    { name: "ביצי חופש (12)", unit: "carton", cost: 14, price: 26, kg: 0.9, units: 12, stock: 40, emoji: "🐓", cat: "ביצים" },
    { name: "חלב 3% (ליטר)", unit: "carton", cost: 4, price: 7, kg: 1, units: 12, stock: 50, emoji: "🥛", cat: "חלב" },
  ] },
  drinks: { name: "משקאות פלוס", category: "משקאות קלים", domains: ["soft"], color: "#1E6FE0", cats: ["קר", "מים", "אנרגיה"], tagline: "משקאות קרים לעסק", products: [
    { name: "קולה (משטח 24)", unit: "carton", cost: 30, price: 54, kg: 8, units: 24, stock: 40, emoji: "🥤", cat: "קר" },
    { name: "מיץ תפוזים (12)", unit: "carton", cost: 24, price: 44, kg: 12, units: 12, stock: 30, emoji: "🧃", cat: "קר" },
    { name: "מים מינרלים (24)", unit: "carton", cost: 12, price: 22, kg: 12, units: 24, stock: 90, emoji: "💧", cat: "מים" },
    { name: "משקה אנרגיה (24)", unit: "carton", cost: 60, price: 108, kg: 6, units: 24, stock: 25, emoji: "⚡", cat: "אנרגיה" },
  ] },
  meat: { name: "אטליז הבשר", category: "מוצרי בשר ועוף", domains: ["meat"], color: "#B23B3B", cats: ["בקר", "עוף", "מעובד"], tagline: "בשר טרי ואיכותי", products: [
    { name: "אנטריקוט", unit: "weight", cost: 55, price: 92, kg: 5, stock: 30, emoji: "🥩", cat: "בקר" },
    { name: "בשר טחון", unit: "weight", cost: 32, price: 52, kg: 5, stock: 40, emoji: "🍖", cat: "בקר" },
    { name: "חזה עוף", unit: "weight", cost: 22, price: 36, kg: 6, stock: 50, emoji: "🍗", cat: "עוף" },
    { name: "שניצל פרוס", unit: "weight", cost: 28, price: 46, kg: 5, stock: 35, emoji: "🍗", cat: "עוף" },
    { name: "נקניקיות (חבילה)", unit: "carton", cost: 12, price: 22, kg: 4, units: 10, stock: 30, emoji: "🌭", cat: "מעובד" },
  ] },
  food: { name: "מזון פלוס — יבשים", category: "מוצרי מזון · תבלינים", domains: ["food", "spices"], color: "#8A5A2B", cats: ["יבשים", "שימורים", "תבלינים"], tagline: "כל המכולת לעסק", products: [
    { name: "אורז (5 ק\"ג)", unit: "carton", cost: 20, price: 34, kg: 5, units: 1, stock: 60, emoji: "🍚", cat: "יבשים" },
    { name: "פסטה (שק 3 ק\"ג)", unit: "carton", cost: 12, price: 22, kg: 3, units: 1, stock: 50, emoji: "🍝", cat: "יבשים" },
    { name: "טונה (משטח 48)", unit: "carton", cost: 90, price: 150, kg: 9, units: 48, stock: 20, emoji: "🐟", cat: "שימורים" },
    { name: "רסק עגבניות (12)", unit: "carton", cost: 24, price: 42, kg: 9, units: 12, stock: 30, emoji: "🥫", cat: "שימורים" },
    { name: "מלח / פלפל (ערכה)", unit: "carton", cost: 8, price: 16, kg: 2, units: 6, stock: 40, emoji: "🧂", cat: "תבלינים" },
  ] },
  disposable: { name: "חד פעמי פלוס", category: "חד פעמי ואריזות", domains: ["disposable"], color: "#5B4BC4", cats: ["כלים", "אריזות", "ניקיון"], tagline: "הכל לעסק, חד פעמי", products: [
    { name: "צלחות (100)", unit: "carton", cost: 15, price: 28, kg: 3, units: 100, stock: 60, emoji: "🍽️", cat: "כלים" },
    { name: "כוסות (50)", unit: "carton", cost: 8, price: 16, kg: 1, units: 50, stock: 80, emoji: "🥤", cat: "כלים" },
    { name: "מגשי אלומיניום (50)", unit: "carton", cost: 20, price: 36, kg: 4, units: 50, stock: 40, emoji: "🥡", cat: "אריזות" },
    { name: "שקיות אשפה (רול)", unit: "carton", cost: 18, price: 32, kg: 5, units: 10, stock: 50, emoji: "🗑️", cat: "ניקיון" },
  ] },
};
// תחומי הפעילות של הספקים — ספק יכול לבחור יותר מתחום אחד
const SUP_DOMAINS = [
  { id: "meat", label: "מוצרי בשר ועוף", emoji: "🥩", cats: ["בקר", "עוף", "הודו", "מעובד"], sample: "חזה עוף", kw: ["בשר", "עוף", "אטליז"] },
  { id: "fish", label: "דגים", emoji: "🐟", cats: ["דגים טריים", "דגים קפואים", "פירות ים"], sample: "פילה סלמון", kw: ["דג"] },
  { id: "food", label: "מוצרי מזון", emoji: "🥫", cats: ["יבשים", "שימורים", "רטבים", "שמנים"], sample: "אורז", kw: ["מזון", "יבש", "מכולת", "שימורים"] },
  { id: "frozen", label: "קפואים", emoji: "🧊", cats: ["ירקות קפואים", "בצקים", "מנות מוכנות"], sample: "בצק עלים", kw: ["קפוא"] },
  { id: "spices", label: "תבלינים", emoji: "🧂", cats: ["תבלינים טחונים", "תערובות", "עשבי תיבול"], sample: "פפריקה", kw: ["תבלין"] },
  { id: "eggs", label: "ביצים", emoji: "🥚", cats: ["ביצים", "ביצי חופש"], sample: "ביצים L", kw: ["ביצ"] },
  { id: "soft", label: "משקאות קלים", emoji: "🥤", cats: ["מוגזים", "מיצים", "מים", "משקאות אנרגיה"], sample: "מים מינרלים", kw: ["שתייה", "משקאות קלים", "מיצים"] },
  { id: "alcohol", label: "משקאות חריפים", emoji: "🥃", cats: ["יין", "בירה", "וויסקי", "וודקה", "ליקרים"], sample: "בקבוק וויסקי", kw: ["חריף", "אלכוהול", "יין", "בירה"] },
  { id: "sweets", label: "ממתקים", emoji: "🍬", cats: ["שוקולד", "סוכריות", "חטיפים", "עוגיות"], sample: "חטיפי שוקולד", kw: ["ממתק", "חטיף", "שוקולד"] },
  { id: "pet", label: "מזון לבעלי חיים", emoji: "🐾", cats: ["כלבים", "חתולים", "ציפורים ומכרסמים"], sample: "מזון לכלבים", kw: ["בעלי חיים", "כלב", "חתול"] },
  { id: "veg", label: "ירקות ופירות", emoji: "🥬", cats: ["ירקות", "פירות", "עלים"], sample: "עגבניות", kw: ["ירק", "פירות"] },
  { id: "dairy", label: "מוצרי חלב", emoji: "🧀", cats: ["חלב", "גבינות", "יוגורטים", "חמאה ושמנת"], sample: "גבינה צהובה", kw: ["חלב", "גבינ"] },
  { id: "icecream", label: "גלידות", emoji: "🍦", cats: ["גלידות", "ארטיקים", "קינוחים קפואים"], sample: "גלידת וניל", kw: ["גליד"] },
  { id: "chilled", label: "מוצרי קירור", emoji: "❄️", cats: ["סלטים", "נקניקים", "ממרחים", "טופו"], sample: "חומוס", kw: ["קירור", "סלט", "נקניק"] },
  { id: "cleaning", label: "ניקיון ותחזוקה", emoji: "🧴", cats: ["חומרי ניקוי", "נייר", "ציוד ניקיון"], sample: "נוזל כלים", kw: ["ניקיון", "תחזוקה"] },
  { id: "disposable", label: "חד פעמי ואריזות", emoji: "🍽️", cats: ["כלים", "אריזות", "שקיות"], sample: "מגשי אלומיניום", kw: ["חד פעמי", "אריזות"] },
  { id: "bakery", label: "מאפים ולחמים", emoji: "🥐", cats: ["לחמים", "מאפים", "עוגות"], sample: "לחמניות", kw: ["מאפ", "לחם", "מאפייה"] },
  { id: "importers", label: "יבואנים", emoji: "🚢", cats: ["מוצרי יבוא"], sample: "מוצר מיובא", pitch: "מוצרי יבוא", kw: ["יבוא"] },
];
const DOMAIN_BY_ID = Object.fromEntries(SUP_DOMAINS.map((d) => [d.id, d]));
// תחומי הספק: מהבחירה השמורה (domains), ולספקים ישנים — זיהוי לפי הטקסט של התחום
const domainsOf = (sup) => { if (!sup) return []; if (Array.isArray(sup.domains) && sup.domains.length) return sup.domains.map((id) => DOMAIN_BY_ID[id]).filter(Boolean); const c = (sup.category || "").trim(); if (!c) return []; return SUP_DOMAINS.filter((d) => c.includes(d.label) || d.kw.some((k) => c.includes(k))); };
const domainOf = (category) => domainsOf({ category })[0] || null;
const domainLabel = (sup) => { const ds = domainsOf(sup); return ds.length ? ds.map((d) => d.label).join(" · ") : ((sup && sup.category) || ""); };
const domainPatch = (ids) => { const ds = ids.map((id) => DOMAIN_BY_ID[id]).filter(Boolean); return { domains: ds.map((d) => d.id), category: ds.map((d) => d.label).join(" · ") || "כללי" }; };
// מה הלקוח רואה בכפתור "הזמנה חדשה" — לפי תחומי הפעילות של הספק
const orderPitch = (sup) => { const ds = domainsOf(sup); if (ds.length) return "הזמן " + ds.map((d) => d.pitch || d.label).join(", "); const cat = (sup.category || "").trim(); if (cat && cat !== "כללי") return "הזמן " + cat; const cs = (sup.cats || []).filter(Boolean); if (cs.length) return "הזמן " + cs.slice(0, 3).join(", "); return "הזמן מהקטלוג של " + (sup.name || "הספק"); };
const broadcastIdeas = (sup) => { const ps = (sup.products || []).filter((p) => p.name); const pick = (i) => ps.length ? ps[i % ps.length] : null; const d = domainsOf(sup)[0]; const a = pick(0), b = pick(1), c = pick(2); const nm = (p, fb) => p ? p.name + (p.emoji ? " " + p.emoji : "") : fb; const fb = d ? d.sample : "מוצר נבחר"; return [
  "מבצע השבוע: 10% הנחה על " + nm(a, fb) + "!",
  "חדש בקטלוג: " + nm(b || a, fb) + " — מזמינים כבר היום",
  "קנו 5 קרטונים " + (c || a ? (c || a).name : fb) + " וקבלו קרטון שישי במתנה 🎁",
  "תזכורת: הזמנות למחר נסגרות היום ב-18:00 ⏰",
]; };
const DEMO_KINDS = [["veg", "ירקות ופירות", "🥬"], ["eggs", "ביצים וחלב", "🥚"], ["drinks", "שתייה", "🥤"], ["meat", "בשר ועוף", "🥩"], ["food", "מזון יבש", "🥫"], ["disposable", "חד פעמי", "🍽️"]];
const TERMS_VERSION = "2026-09";
const TERMS = "תקנון ותנאי שימוש — B2B+ Marketplace\n(גרסה " + "2026-09" + ")\n\n1. כללי והסכמה\n1.1 B2B+ Marketplace (\"המערכת\" / \"B2B+\" / \"אנחנו\") היא פלטפורמה טכנולוגית המאפשרת לספקים לנהל חנות מקוונת, ולעסקים (\"לקוחות\") להזמין מהם סחורה.\n1.2 ההרשמה, הכניסה או כל שימוש במערכת מהווים הסכמה מלאה לתקנון זה. מי שאינו מסכים — אינו רשאי להשתמש במערכת.\n1.3 המשתמש מצהיר כי הוא בן 18 ומעלה, וכי הוא מוסמך לפעול ולהתחייב בשם העסק שאותו רשם.\n\n2. מעמד B2B+ — פלטפורמה בלבד\n2.1 B2B+ אינה צד לעסקה בין ספק ללקוח, אינה מוכרת, קונה, מחזיקה או משנעת סחורה, ואינה סוכנת של אף צד.\n2.2 כל האחריות למוצרים, לטיבם, לתקינותם, לכשרותם, לבטיחותם, לתאריכי התפוגה, לעמידה בתקנים וברישוי, למחירים, לחשבוניות, למשלוחים ולגבייה — חלה על הספק ועל הלקוח בלבד.\n2.3 מחלוקת בין ספק ללקוח תיושב ביניהם ישירות. B2B+ לא תהיה צד לה ולא תישא בכל נזק הנובע ממנה.\n\n3. חשבון משתמש ואבטחה\n3.1 המשתמש מתחייב למסור פרטים נכונים, מלאים ומעודכנים, ולעדכנם בעת שינוי.\n3.2 המשתמש אחראי לשמירת סודיות הסיסמה ולכל פעולה שתתבצע בחשבונו, לרבות פעולות של עובדים שהוא הוסיף (מלקטים, נהגים, סוכנים).\n3.3 יש להודיע לנו מיד על כל חשד לשימוש לא מורשה בחשבון.\n\n4. מנוי, תשלומים וחיובים (לספקים)\n4.1 השימוש לספקים כרוך בדמי מנוי לפי המסלול שנבחר. המחירים אינם כוללים מע\"מ אלא אם צוין אחרת.\n4.2 הספק מאשר ל-B2B+ לחייב את אמצעי התשלום שמסר, באופן חודשי וחוזר, עד לביטול המנוי. התשלום מעובד באמצעות חברת סליקה חיצונית מורשית; B2B+ אינה שומרת את מספר הכרטיס המלא.\n4.3 ביטול מנוי ייכנס לתוקף בסוף תקופת החיוב הנוכחית. דמי מנוי ששולמו אינם מוחזרים, בכפוף לחוק הגנת הצרכן ככל שהוא חל.\n4.4 אי-תשלום עלול להביא להשעיית החשבון. B2B+ רשאית לעדכן מחירים בהודעה מראש של 30 יום.\n\n5. תוכן ומידע שהמשתמש מעלה\n5.1 המשתמש אחראי באופן בלעדי לכל תוכן שהוא מעלה: מוצרים, מחירים, תמונות, לוגו, הודעות, מבצעים, מסמכים וחשבוניות.\n5.2 המשתמש מצהיר כי יש לו את כל הזכויות בתוכן, וכי התוכן אינו מפר זכויות יוצרים, סימני מסחר, פרטיות או כל דין.\n5.3 המשתמש מעניק ל-B2B+ רישיון שימוש בתוכן לצורך תפעול השירות והצגתו בלבד.\n5.4 הודעות שיווקיות ומבצעים שספק שולח ללקוחותיו הם באחריותו בלבד, לרבות עמידה בחוק התקשורת (\"חוק הספאם\").\n\n6. כלים אוטומטיים (סריקת חשבוניות, דוחות, חישובים)\n6.1 המערכת מציעה כלים אוטומטיים, לרבות סריקת חשבוניות באמצעות בינה מלאכותית, חישובי רווח, נקודות, יעדים ודוחות הכנסות והוצאות.\n6.2 תוצרי הכלים הם עזר בלבד ועשויים לכלול טעויות. על המשתמש לבדוק כל נתון לפני שמירה או שימוש.\n6.3 הדוחות אינם מהווים ייעוץ חשבונאי, מס או משפטי, ואינם תחליף להנהלת חשבונות כדין או לרואה חשבון.\n\n7. תוכנית יעדים ופרסים\nתוכנית היעדים והפרסים מוגדרת ומנוהלת על ידי כל ספק. הספק לבדו אחראי להגדרת התנאים, לעמידה בהם ולמסירת הפרסים. B2B+ אינה מתחייבת לפרס כלשהו.\n\n8. זמינות השירות\n8.1 השירות ניתן \"כמות שהוא\" (AS IS) ו\"כפי שהוא זמין\". איננו מתחייבים שהשירות יפעל ללא הפסקות, תקלות או שגיאות.\n8.2 B2B+ רשאית לשנות, לעדכן, להשבית זמנית או להפסיק כל חלק מהשירות. מומלץ לשמור עותק של מידע חיוני, לרבות חשבוניות ודוחות.\n\n9. הגבלת אחריות\n9.1 B2B+ לא תהיה אחראית לכל נזק עקיף, תוצאתי, מיוחד או אובדן רווחים, הכנסות, מידע או מוניטין.\n9.2 בכל מקרה, אחריותה הכוללת של B2B+ לא תעלה על סך דמי המנוי ששילם המשתמש בשלושת החודשים שקדמו לאירוע.\n9.3 B2B+ אינה אחראית לשירותי צד שלישי (סליקה, מיילים, אחסון, מפות, בינה מלאכותית) ולתקלות בהם.\n\n10. שיפוי\nהמשתמש ישפה את B2B+, בעליה ועובדיה בגין כל תביעה, נזק, הוצאה או שכר טרחת עו\"ד הנובעים מהפרת התקנון, מהפרת דין, מתוכן שהעלה או מעסקה שביצע דרך המערכת.\n\n11. שימוש אסור\nאסור: להעתיק את המערכת או חלקים ממנה, לבצע הנדסה לאחור, לנסות לחדור לחשבונות אחרים, להעלות קוד זדוני, לאסוף מידע על משתמשים, להתחזות, לשלוח דואר זבל או למכור מוצרים אסורים על פי דין.\n\n12. פרטיות ומידע\n12.1 המידע נשמר ומעובד לצורך תפעול השירות, אבטחה, חיוב ושיפור המערכת, בהתאם לחוק הגנת הפרטיות.\n12.2 ספק מקבל גישה לפרטי הלקוחות שהצטרפו אליו, ומתחייב להשתמש בהם רק לצורך ההתקשרות העסקית ביניהם ולשמור עליהם כנדרש בחוק.\n12.3 משתמש רשאי לבקש לעיין במידע עליו, לתקנו או למחקו, בכפוף לחובות שמירת רשומות על פי דין.\n\n13. קניין רוחני\nכל הזכויות במערכת, בקוד, בעיצוב, בשם ובסימן B2B+ שמורות ל-B2B+. אין בשימוש במערכת כדי להעניק למשתמש זכות כלשהי בהם.\n\n14. השעיה וסגירת חשבון\nB2B+ רשאית להשעות או לסגור חשבון, לאלתר ולפי שיקול דעתה, בכל מקרה של הפרת התקנון, חשד להונאה, אי-תשלום או פגיעה במשתמשים אחרים או במערכת.\n\n15. שינויים בתקנון\nB2B+ רשאית לעדכן תקנון זה. הודעה על שינוי מהותי תימסר במערכת; המשך השימוש לאחר העדכון מהווה הסכמה לנוסח המעודכן.\n\n16. דין וסמכות שיפוט\nעל התקנון יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים במחוז תל אביב-יפו.\n\n17. יצירת קשר\nפניות בנוגע לתקנון, לפרטיות או לשירות: support@b2bplus.co.il";
// ---- מסלולי מנוי (המחירים לפני מע"מ, לחודש) ----
const PLANS = { basic: { id: "basic", name: "בסיסי", price: 199, tagline: "כל מה שצריך כדי לקבל הזמנות" }, premium: { id: "premium", name: "פרימיום", price: 299, tagline: "כל הכלים, בלי הגבלות" } };
const planGross = (pl) => Math.round(pl.price * (1 + BILL_VAT) * 100) / 100;
const planPriceText = (pl) => NIS(pl.price) + ' + מע"מ = ' + NIS(planGross(pl)); // למשל: ₪199 + מע"מ = ₪234.82
const planOf = (id) => PLANS[id] || (id === "pro" ? PLANS.premium : PLANS.basic); // "pro" ממסלולים ישנים = פרימיום
// מה כלול בכל מסלול: basic=true → כלול גם בבסיסי. בפרימיום הכל כלול.
const PLAN_FEATURES = [
  { id: "store", label: "חנות אונליין וקטלוג מוצרים", basic: true },
  { id: "orders", label: "קבלת הזמנות וניהול לקוחות", basic: true },
  { id: "share", label: "קישור לשיתוף החנות", basic: true },
  { id: "chat", label: "צ'אט והודעות מבצע ללקוחות", basic: true },
  { id: "invoices", label: "חשבוניות ללקוחות", basic: true },
  { id: "design", label: "עיצוב החנות ומיתוג אישי", basic: false },
  { id: "prizes", label: "יעדים ופרסים ללקוחות", basic: false },
  { id: "staff", label: "צוות: מלקטים, נהגים וסוכנים", basic: false },
  { id: "scan", label: "סריקת חשבוניות קנייה ב-AI", basic: false },
  { id: "finance", label: "דוח הכנסות והוצאות חודשי", basic: false },
  { id: "support", label: "תמיכה בעדיפות", basic: false },
];
const TRIAL_DAYS = 30; const DAY_MS = 86400000;
const isDemoSup = (sp) => !!sp && String(sp.id || "").indexOf("demo") === 0;
const hasFeature = (sp, f) => { if (!sp || !sp.sub || isDemoSup(sp)) return true; const ft = PLAN_FEATURES.find((x) => x.id === f); return !ft || ft.basic || planOf(sp.sub.plan).id === "premium"; };
// מצב המנוי בפועל: ניסיון שעבר את תאריך הסיום נחשב "הסתיים"
const subState = (sub) => {
  if (!sub) return { st: "none", label: "ללא מנוי", tone: "red" };
  if (sub.status === "trial") { const ends = sub.trialEnds || ((sub.since || Date.now()) + TRIAL_DAYS * DAY_MS); const left = Math.ceil((ends - Date.now()) / DAY_MS); return left > 0 ? { st: "trial", ends, left, label: "חודש ניסיון · עוד " + left + (left === 1 ? " יום" : " ימים"), tone: left <= 7 ? "red" : "amber" } : { st: "expired", ends, left: 0, label: "הניסיון הסתיים", tone: "red" }; }
  if (sub.status === "active") return { st: "active", label: "מנוי פעיל", tone: "green" };
  if (sub.status === "expired") return { st: "expired", label: "הניסיון הסתיים", tone: "red" };
  return { st: "canceled", label: "מבוטל", tone: "red" };
};
const subLocked = (sp) => !!sp && !isDemoSup(sp) && !!sp.sub && ["expired", "canceled"].includes(subState(sp.sub).st);
const newTrialSub = (plan, prev) => ({ ...(prev || {}), plan: plan || "premium", status: "trial", since: Date.now(), trialEnds: Date.now() + TRIAL_DAYS * DAY_MS, method: (prev && prev.method) || "none", invoices: (prev && prev.invoices) || [], cancelRequested: null, canceledAt: null });
const BILL_VAT = 0.18;
const demoSupplier = (kind) => { const now = Date.now(); const id = "demo" + now; const t = DEMO_TEMPLATES[kind] || DEMO_TEMPLATES.veg; return {
  id, name: t.name + " (הדגמה)", category: t.category, domains: t.domains, regions: "מרכז, השרון", status: "active",
  biz: { taxId: "500000000", address: "רחוב הדוגמה 1, תל אביב", phone: "03-0000000", email: "" },
  invoiceSeq: 5000,
  owner: { email: "demo-" + now + "@b2bplus.co.il", password: "1234", contact: "מנהל הדגמה", phone: "050-0000000" },
  brand: { logo: "", tagline: t.tagline, color: t.color, borderW: 2.5 },
  cats: t.cats, features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(),
  products: t.products.map((pr, i) => ({ id: "dp" + i, img: "", ...pr })),
  clients: [
    { id: "dc1", name: "מסעדת הדגמה", contact: "דנה כהן", phone: "050-1111111", address: "דיזנגוף 100, תל אביב", email: "demo-rest-" + now + "@demo.co.il", password: "1234", taxId: "514000001", structure: "עוסק מורשה", category: "מסעדה", pay: "credit", status: "active", target: 20, docs: [], createdAt: now - 86400000 * 8 },
    { id: "dc2", name: "בית קפה לדוגמה", contact: "רון לוי", phone: "050-2222222", address: "אלנבי 50, תל אביב", email: "demo-cafe-" + now + "@demo.co.il", password: "1234", taxId: "514000002", structure: "חברה בעמ", category: "בית קפה", pay: "cash", status: "active", target: 12, docs: [], createdAt: now - 86400000 * 5 },
    { id: "dc3", name: "קייטרינג (ממתין לאישור)", contact: "שירה אזולאי", phone: "050-3333333", address: "הרצליה", email: "demo-inst-" + now + "@demo.co.il", password: "1234", taxId: "514000003", structure: "עוסק מורשה", category: "קייטרינג", pay: "check", status: "pending", target: 30, docs: ["רישיון עסק"], createdAt: now - 86400000 },
  ],
  staff: [
    { id: "dk1", role: "picker", name: "מלקט הדגמה", email: "demo-pick-" + now + "@b2bplus.co.il", password: "1234" },
    { id: "dd1", role: "driver", name: "נהג הדגמה", email: "demo-drive-" + now + "@b2bplus.co.il", password: "1234" },
    { id: "da1", role: "agent", name: "סוכן הדגמה", email: "demo-agent-" + now + "@b2bplus.co.il", password: "1234" },
  ],
  orders: [
    { id: "D" + (now % 100000) + "1", clientId: "dc1", date: now - 86400000 * 2, status: "delivered", driverId: "dd1", paid: true, pickedBy: "מלקט הדגמה", invNo: 5001, items: [{ pid: "dp0", cartons: 5, supplied: 5, actualKg: 52 }, { pid: "dp1", cartons: 3, supplied: 3, actualKg: 24 }] },
    { id: "D" + (now % 100000) + "2", clientId: "dc2", date: now - 3600000 * 5, status: "picked", pickedBy: "מלקט הדגמה", invNo: 5002, items: [{ pid: "dp2", cartons: 4, supplied: 4 }] },
    { id: "D" + (now % 100000) + "3", clientId: "dc1", date: now - 3600000 * 2, status: "new", items: [{ pid: "dp0", cartons: 2 }, { pid: "dp1", cartons: 3 }] },
  ],
  messages: [], broadcasts: [{ id: "db2", text: "מבצע השבוע: 10% הנחה על " + t.products[0].name + " " + (t.products[0].emoji || "") + "!", ts: now - 3600000 * 6 }, { id: "db1", text: "ברוכים הבאים לחנות ההדגמה של B2B+ 🎉", ts: now - 3600000 * 24 }],
}; };
const seed = () => ({
  superPw: SUPER_PW,
  superAgents: [{ id: "sa1", role: "superagent", name: "תמיכה B2B+", email: "support@b2bplus.co.il", password: "1234" }],
  suppliers: [{ id: "s1", name: "שיווק השדה", category: "ירקות ופירות", domains: ["veg"], regions: "מרכז, השרון, תל אביב", status: "active", biz: { taxId: "515123456", address: "המסגר 20, תל אביב", phone: "03-5551234", email: "billing@sadeh.co.il" }, invoiceSeq: 1000, owner: { email: "admin@sadeh.co.il", password: "1234", contact: "בעל העסק", phone: "050-0000000" }, brand: { logo: "", tagline: "ירקות ופירות טריים לעסקים", color: "#1F7A4D", borderW: 2.5 }, sub: { plan: "pro", status: "active", method: "credit", since: Date.now() - 86400000 * 40, last4: "4417", invoices: [] }, cats: ["ירקות", "פירות"], features: { prizes: true, chat: true, minOrder: 5 }, ...supplierData() }, secondSupplier()],
});

// מקטין נתונים ישנים: מסיר עותקים של לוגו ברירת המחדל שנשמרו אצל כל ספק
const OLD_LOGO_SIG = "V1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ip"; // הלוגו הקודם (רקע שחור)
const slimState = (st) => { if (!st || !st.suppliers) return st; let ch = false; const suppliers = st.suppliers.map((sp0) => { let sp = sp0;
  if (sp.brand && (sp.brand.logo === LOGO_IMG || (typeof sp.brand.logo === "string" && sp.brand.logo.includes(OLD_LOGO_SIG)))) { ch = true; sp = { ...sp, brand: { ...sp.brand, logo: "" } }; }
  // כל ספק מקבל חודש ניסיון: ספק בלי מנוי, או ניסיון ישן בלי תאריך סיום → 30 יום מהיום
  if (!isDemoSup(sp) && (!sp.sub || (sp.sub.status === "trial" && !sp.sub.trialEnds))) { ch = true; sp = { ...sp, sub: newTrialSub((sp.sub && sp.sub.plan === "basic") ? "basic" : "premium", sp.sub) }; }
  return sp; }); return ch ? { ...st, suppliers } : st; };
// מכווץ תמונה שמועלית (לוגו / מוצר) לפני שמירה
const pickImage = (file, maxW, cb) => { if (!file) return; compressImage(file, maxW, 0.72).then(cb).catch(() => { const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(file); }); };
function useAppState() {
  const [state, setState] = useState(null);
  const lastSaveRef = React.useRef(0); const pendingRef = React.useRef(null); const latestRef = React.useRef(null);
  useEffect(() => { let live = true; (async () => { try { const r = await window.storage.get(KEY); if (live) setState(r && r.value ? slimState(JSON.parse(r.value)) : seed()); } catch { if (live) setState(seed()); } })(); return () => { live = false; }; }, []);
  // שמירה מושהית: נשמר חצי שנייה אחרי השינוי האחרון, ולא בכל הקשה
  useEffect(() => {
    if (!state) return; latestRef.current = state;
    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = setTimeout(async () => { pendingRef.current = null; lastSaveRef.current = Date.now(); try { await window.storage.set(KEY, JSON.stringify(latestRef.current)); } catch {} }, 600);
  }, [state]);
  // שמירה מיידית לפני סגירת הדף, כדי לא לאבד שינוי אחרון
  useEffect(() => { const flush = () => { if (pendingRef.current && latestRef.current) { clearTimeout(pendingRef.current); pendingRef.current = null; try { window.storage.set(KEY, JSON.stringify(latestRef.current)); } catch {} } }; window.addEventListener("pagehide", flush); return () => window.removeEventListener("pagehide", flush); }, []);
  // סנכרון בין מכשירים: רק כשחוזרים לאפליקציה (בלי בדיקה קבועה ברקע)
  useEffect(() => {
    const reload = async () => { if (pendingRef.current || Date.now() - lastSaveRef.current < 3000) return; try { const r = await window.storage.get(KEY); if (r && r.value) { const remote = slimState(JSON.parse(r.value)); setState((cur) => JSON.stringify(cur) === JSON.stringify(remote) ? cur : remote); } } catch {} };
    const onVis = () => { if (document.visibilityState === "visible") reload(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return [state, setState];
}

/* helpers */
const VAT = 0.18;
// סוגי יחידה: "carton" = קרטון, "unit" = יחידה בודדת, "weight" = לפי ק"ג. קרטון ויחידה מחושבים אותו דבר (לפי כמות)
const isPack = (p) => !!p && (p.unit === "carton" || p.unit === "unit");
const packWord = (p) => p && p.unit === "unit" ? "יחידה" : "קרטון";
const UNIT_OPTS = [["carton", "לפי קרטון"], ["unit", "לפי יחידה"], ["weight", 'לפי ק"ג']];
const noPrice = (p) => !!p.noPrice || !(p.price > 0);
const cartonPrice = (p) => p.price * p.kg;
// מחיר קרטון כולל מע"מ אם המוצר מוגדר "לא כולל מע"מ"
const cartonPriceGross = (p) => cartonPrice(p) * (p.vatIncluded === false ? (1 + VAT) : 1);
const suppliedOf = (it) => it.supplied != null ? it.supplied : it.cartons;
const shortageOf = (it) => Math.max(0, it.cartons - suppliedOf(it));
const hasShortage = (o) => o.items.some((it) => shortageOf(it) > 0);
const lineKg = (it, p) => isPack(p) ? suppliedOf(it) * p.kg : (it.actualKg != null ? it.actualKg : suppliedOf(it) * p.kg);
const lineUnitGross = (p) => isPack(p) ? cartonPriceGross(p) : (p.price * (p.vatIncluded === false ? (1 + VAT) : 1));
const lineTotal = (it, p) => noPrice(p) ? 0 : (isPack(p) ? suppliedOf(it) * cartonPriceGross(p) : lineKg(it, p) * (p.price * (p.vatIncluded === false ? (1 + VAT) : 1)));
const lineProfit = (it, p) => lineKg(it, p) * (p.price - p.cost);
const orderCartons = (o) => o.items.reduce((s, it) => s + it.cartons, 0);
const orderKgEff = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineKg(it, p) : 0); }, 0);
const orderTotal = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineTotal(it, p) : 0); }, 0);
const orderProfit = (o, ps) => o.items.reduce((s, it) => { const p = ps.find((x) => x.id === it.pid); return s + (p ? lineProfit(it, p) : 0); }, 0);
const monthOrdersOf = (cid, orders) => orders.filter((o) => o.clientId === cid && monthKey(o.date) === nowMonth);
const monthKgOf = (cid, orders, ps) => monthOrdersOf(cid, orders).reduce((s, o) => s + orderKgEff(o, ps), 0);
// תקופת יעדים: מחודש ועד שנה. התקופות נספרות מנקודת עוגן (ברירת מחדל: 1 בינואר של השנה)
const periodAnchorOf = (anchor) => { const a = anchor ? new Date(anchor) : new Date(new Date().getFullYear(), 0, 1); return new Date(a.getFullYear(), a.getMonth(), 1); };
const periodStartMs = (pm, anchor) => { const n = Math.min(12, Math.max(1, +pm || 1)); const a = periodAnchorOf(anchor); const now = new Date(); const diff = (now.getFullYear() - a.getFullYear()) * 12 + (now.getMonth() - a.getMonth()); const k = Math.floor(diff / n) * n; return new Date(a.getFullYear(), a.getMonth() + k, 1).getTime(); };
const periodEndMs = (pm, anchor) => { const n = Math.min(12, Math.max(1, +pm || 1)); const st = new Date(periodStartMs(pm, anchor)); return new Date(st.getFullYear(), st.getMonth() + n, 1).getTime(); };
const periodLabel = (pm, anchor) => { const n = Math.min(12, Math.max(1, +pm || 1)); const st = new Date(periodStartMs(pm, anchor)); if (n === 1) return st.toLocaleDateString("he-IL", { month: "long", year: "numeric" }); const e = new Date(st.getFullYear(), st.getMonth() + n - 1, 1); const sameY = st.getFullYear() === e.getFullYear(); return st.toLocaleDateString("he-IL", sameY ? { month: "long" } : { month: "long", year: "numeric" }) + "–" + e.toLocaleDateString("he-IL", { month: "long", year: "numeric" }); };
const periodName = (pm) => { const n = Math.min(12, Math.max(1, +pm || 1)); return ({ 1: "חודשי", 2: "דו-חודשי", 3: "רבעוני", 6: "חצי-שנתי", 12: "שנתי" })[n] || ("ל-" + n + " חודשים"); };
const PERIOD_OPTS = [[1, "חודש"], [2, "חודשיים"], [3, "3 חודשים (רבעון)"], [4, "4 חודשים"], [5, "5 חודשים"], [6, "חצי שנה"], [7, "7 חודשים"], [8, "8 חודשים"], [9, "9 חודשים"], [10, "10 חודשים"], [11, "11 חודשים"], [12, "שנה"]];
const periodKgOf = (cid, orders, ps, pm, anchor) => { const st = periodStartMs(pm, anchor); return orders.filter((o) => o.clientId === cid && o.date >= st).reduce((s, o) => s + orderKgEff(o, ps), 0); };
const pointsOf = (cid, orders, ps, kgpp, pm = 1, anchor) => Math.floor(periodKgOf(cid, orders, ps, pm, anchor) / kgpp);
const outstandingOf = (cid, orders, ps) => orders.filter((o) => o.clientId === cid && o.status === "delivered" && !o.paid).reduce((s, o) => s + orderTotal(o, ps), 0);
const hasRole = (u, role) => u.role === role || (u.roles || []).includes(role);
const sortTiers = (t) => [...t].sort((a, b) => a.points - b.points);
const reachedTier = (pts, tiers) => sortTiers(tiers).filter((t) => pts >= t.points).pop() || null;
const nextTier = (pts, tiers) => sortTiers(tiers).find((t) => t.points > pts) || null;

function Logo({ size = 42, light = false, sub = false, wordmark = false, img, name, tagline }) {
  const src = img || LOGO_IMG;
  const nm = name || "B2B+";
  const tg = tagline || "ממשק הזמנות מהספק לעסק";
  const image = <img src={src} alt={nm} style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), objectFit: "cover", display: "block", boxShadow: light ? "0 2px 6px rgba(0,0,0,.18)" : "0 3px 12px rgba(18,74,43,.16)" }} />;
  if (!wordmark) return image;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {image}
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontWeight: 800, fontSize: Math.round(size * 0.46), color: light ? "#fff" : C.greenDeep, letterSpacing: "-0.5px" }}>{nm}</div>
        {sub && <div style={{ fontSize: Math.round(size * 0.24), color: light ? "rgba(255,255,255,.82)" : C.sub, fontWeight: 600, marginTop: 4 }}>{tg}</div>}
      </div>
    </div>
  );
}

function PayMarkModal({ order, state, setState, onClose }) {
  const [method, setMethod] = useState("cash");
  const [checkDue, setCheckDue] = useState("");
  const save = () => { setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === order.id ? { ...o, paid: true, paidMethod: method, paidAt: Date.now(), checkDue: method === "check" ? checkDue : "" } : o) })); onClose(); };
  return (
    <Modal onClose={onClose} title={"סימון תשלום · הזמנה #" + order.id}>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>איך שולמה ההזמנה? · {NIS(orderTotal(order, state.products))}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {[["cash", "מזומן"], ["credit", "אשראי"], ["check", "צ'ק"]].map(([k, lbl]) => <button key={k} onClick={() => setMethod(k)} style={{ border: `1.5px solid ${method === k ? C.green : C.line}`, background: method === k ? C.greenSoft : "#fff", color: method === k ? C.greenDeep : C.sub, borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><PayIcon pay={k} size={15} /> {lbl}</button>)}
      </div>
      {method === "check" && <label style={{ display: "block", marginBottom: 12 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>תאריך פירעון הצ'ק</div><input type="date" value={checkDue} onChange={(e) => setCheckDue(e.target.value)} style={fieldStyle} /></label>}
      <SubmitBtn onClick={save}>אשר תשלום</SubmitBtn>
    </Modal>
  );
}
function applyAutoBilling(root) {
  const nowMonth = new Date().toISOString().slice(0, 7);
  let changed = false;
  const suppliers = (root.suppliers || []).map((sp) => {
    if (sp.id.indexOf("demo") === 0) return sp;
    const sub = sp.sub; if (!sub || sub.status !== "active") return sp;
    if (sub.method !== "credit" || !sub.last4) return sp; // חיוב אוטומטי רק בכרטיס אשראי שמור
    const invoices = sub.invoices || [];
    if (invoices.some((iv) => iv.month === nowMonth)) return sp; // כבר חויב החודש
    // חיוב רק אם עברו לפחות ~חודש מתחילת המנוי
    const since = sub.since || 0; if (Date.now() - since < 24 * 3600 * 1000) return sp;
    const plan = planOf(sub.plan); const net = plan.price; const vat = net * BILL_VAT; const gross = net + vat;
    const inv = { id: "SV" + Date.now() + "-" + sp.id, month: nowMonth, plan: plan.id, planName: plan.name, net, vat, gross, method: sub.method, ts: Date.now(), paid: true, auto: true };
    changed = true;
    return { ...sp, sub: { ...sub, invoices: [inv, ...invoices], lastCharge: Date.now() } };
  });
  return changed ? { ...root, suppliers } : null;
}
function AutoBilling({ state, setState, active }) {
  useEffect(() => {
    if (!active || !state) return;
    const run = () => setState((r) => applyAutoBilling(r) || r);
    run();
    const iv = setInterval(run, 6 * 3600 * 1000); // בדיקה כל כמה שעות כל עוד פתוח
    return () => clearInterval(iv);
  }, [active]);
  return null;
}
function AlertSound({ count, active }) {
  const prev = React.useRef(null);
  useEffect(() => {
    if (!active) { prev.current = null; return; }
    if (prev.current !== null && count > prev.current) { try { const AC = window.AudioContext || window.webkitAudioContext; const ctx = new AC(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.value = 880; g.gain.setValueAtTime(0.0001, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.26); setTimeout(() => { try { ctx.close(); } catch (e) {} }, 400); } catch (e) {} }
    prev.current = count;
  }, [count, active]);
  return null;
}
function FontLoader({ font }) {
  useEffect(() => { if (!font || font === "Rubik") return; const id = "gf-" + font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [font]);
  return null;
}
export default function App() {
  const [state, setState] = useAppState();
  const [session, setSession] = useState({ kind: "none" });
  const [saved, setSaved] = useState(false);
  const [storeId] = useState(() => { try { return new URL(window.location.href).searchParams.get("store"); } catch { return null; } });
  const [joinMode, setJoinMode] = useState(() => { try { return new URL(window.location.href).searchParams.has("join"); } catch { return false; } }); // קישור מפרסום: ?join=1
  const [joinSrc] = useState(readUtm);
  const [showProfile, setShowProfile] = useState(false); const [showBell, setShowBell] = useState(false); const [mgrIntent, setMgrIntent] = useState(null);
  useEffect(() => { if (!document.getElementById("ff-rubik")) { const l = document.createElement("link"); l.id = "ff-rubik"; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap"; document.head.appendChild(l); } if (!document.getElementById("tp-css")) { const st = document.createElement("style"); st.id = "tp-css"; st.textContent = ".tp-click{transition:transform .12s ease,box-shadow .12s ease}.tp-click:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(18,40,80,.14)!important}.tp-click:active{transform:translateY(0)}.tp-2col{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:20px}.tp-2eq{grid-template-columns:1fr 1fr}.tp-staff{grid-template-columns:1fr 1fr 1fr 1fr auto}@media(max-width:760px){.tp-2col{grid-template-columns:1fr}.tp-staff{grid-template-columns:1fr 1fr}}@media(max-width:560px){.tp-2eq{grid-template-columns:1fr}}"; document.head.appendChild(st); } }, []);
  if (!state) return <div dir="rtl" style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: C.sub }}>טוען…</div>;
  if (session.kind === "none") { const storeSup = storeId ? state.suppliers.find((x) => x.id === storeId && x.status === "active") : null; if (joinMode && !storeSup) return <SupplierLanding state={state} setState={setState} onLogin={setSession} onBack={() => setJoinMode(false)} source={joinSrc} />; return storeSup ? <StorePage supplier={storeSup} state={state} setState={setState} onLogin={setSession} /> : <AuthScreen state={state} setState={setState} onLogin={setSession} />; }
  const save = async () => { try { await window.storage.set(KEY, JSON.stringify(state)); } catch {} setSaved(true); setTimeout(() => setSaved(false), 1600); };
  const isSuper = session.kind === "super";
  const isAgent = session.kind === "superagent";
  const isHub = session.kind === "client" && !session.supplierId;
  const sup = (isSuper || isAgent || isHub) ? null : state.suppliers.find((x) => x.id === session.supplierId);
  if (!isSuper && !isAgent && !isHub && !sup) return <AuthScreen state={state} setState={setState} onLogin={setSession} />;
  const scopedSet = (u) => setState((root) => ({ ...root, suppliers: root.suppliers.map((s) => s.id === session.supplierId ? (typeof u === "function" ? u(s) : u) : s) }));
  const clientRec = (session.kind === "client" && sup) ? sup.clients.find((c) => c.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase()) : null;
  const joinSupplier = (supId, note) => setState((root) => { let prof = null; for (const sp of root.suppliers) { const c = sp.clients.find((x) => x.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase()); if (c) prof = c; } if (!prof) return root; const tgt = root.suppliers.find((x) => x.id === supId); if (tgt && tgt.clients.some((c) => c.email.trim().toLowerCase() === session.email.trim().toLowerCase())) return root; const { id, readBc, ...rest } = prof; const ncId = "c" + Date.now(); const nc = { ...rest, id: ncId, status: "pending", createdAt: Date.now() }; const emL = session.email.trim().toLowerCase(); const inq = ((tgt && tgt.inquiries) || []).find((q) => q.email === emL); const old = inq ? inq.msgs.map((m) => ({ id: m.id, clientId: ncId, fromRole: m.from === "client" ? "client" : "manager", fromName: m.from === "client" ? nc.name : "מנהל", text: m.text, ts: m.ts, readBySup: true })) : []; const msgs = note && note.trim() ? [{ id: "m" + Date.now(), clientId: ncId, fromRole: "client", fromName: nc.name, text: note.trim(), ts: Date.now() }] : []; return { ...root, suppliers: root.suppliers.map((sp) => sp.id === supId ? { ...sp, clients: [...sp.clients, nc], messages: [...sp.messages, ...old, ...msgs], inquiries: (sp.inquiries || []).filter((q) => q.email !== emL) } : sp) }; });
  const me = isSuper ? { name: "מנהל-על" } : isAgent ? { name: "סוכן-על" } : isHub ? { name: "העסק שלי" } : session.kind === "supplier" ? { name: sup.name } : session.kind === "client" ? clientRec : (sup ? sup.staff.find((s) => s.id === session.userId) : null);
  const title = isSuper ? "פיקוח על כל הספקים" : isAgent ? "ניהול ותמיכה" : isHub ? "הספקים שלי" : session.kind === "supplier" ? "ניהול החנות" : (ROLE_LABEL[session.kind] || "") + " · " + (me ? me.name : "");
  const supNewOrders = session.kind === "supplier" && sup ? sup.orders.filter((o) => o.status === "new").length : 0;
  const supUnreadMsgs = session.kind === "supplier" && sup ? sup.messages.filter((m) => m.fromRole === "client" && !m.readBySup).length + (sup.inquiries || []).filter((q) => q.unread).length : 0;
  const supAlerts = supNewOrders + supUnreadMsgs;
  const bizRec = session.kind === "client" ? (state.suppliers.map((sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === (session.email || "").trim().toLowerCase())).find(Boolean) || null) : null;
  const staffRoles = (me && me.role) ? [me.role, ...((me.roles) || [])].filter((v, i, a) => a.indexOf(v) === i) : [];
  const isStaffView = ["picker", "driver", "agent"].includes(session.kind);
  const headerBg = sup && sup.brand && sup.brand.color ? `linear-gradient(100deg, ${shade(sup.brand.color)}, ${sup.brand.color})` : `linear-gradient(100deg, ${C.greenDeep}, #1E6FE0)`;
  const themeFont = (sup && sup.brand && sup.brand.font) || "Rubik";
  const themeScale = Math.min(1.15, (sup && sup.brand && sup.brand.fontScale) || 1);
  const clientThemed = sup && (session.kind === "client");
  const themed2 = sup && (session.kind === "client" || session.kind === "supplier");
  const pageBg = themed2 ? bgStyle((sup.brand && sup.brand.bg) || "soft", (sup.brand && sup.brand.color) || C.green, sup.brand && sup.brand.bgColor) : C.bg;
  const themeFontColor = (sup && sup.brand && sup.brand.fontColor) || C.ink;
  const pageFont = themed2 ? `'${themeFont}', ${FONT}` : FONT;

  return (
    <div dir="rtl" style={{ background: pageBg, minHeight: "100vh", color: C.ink, fontFamily: pageFont }}>
      <div style={{ background: headerBg, color: "#fff", boxShadow: "0 2px 12px rgba(18,74,43,.18)", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_IMG} alt="B2B+" title="B2B+ Marketplace" style={{ width: 34, height: 34, borderRadius: 9, objectFit: "cover", boxShadow: "0 1px 4px rgba(0,0,0,.25)" }} />
            <div style={{ lineHeight: 1.05 }}><div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.4px" }}><bdi dir="ltr">B2B+</bdi></div><div style={{ fontSize: 10.5, opacity: .8, fontWeight: 600 }}>Marketplace</div></div>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 13.5, opacity: .92, fontWeight: 600 }}>{title}</span>
          {session.kind === "client" && session.supplierId && <button onClick={() => setSession({ kind: "client", email: session.email, pw: session.pw })} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><Building2 size={15} /> הספקים שלי</button>}
          <button onClick={() => setShowProfile(true)} title="הפרופיל שלי" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><User size={16} /></button>
          {session.kind === "supplier" && supAlerts > 0 && <button onClick={() => setShowBell(true)} title="עדכונים חדשים" style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><Bell size={16} /><span style={{ background: C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{supAlerts}</span></button>}
          <button onClick={save} style={{ display: "flex", alignItems: "center", gap: 6, background: saved ? "#fff" : "rgba(255,255,255,.16)", color: saved ? C.greenDeep : "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{saved ? <Check size={15} /> : <Save size={15} />}{saved ? "נשמר" : "שמור"}</button>
          <button onClick={() => setSession(session.asSuper ? { kind: session.from || "super" } : { kind: "none" })} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", color: "#fff", border: "none", borderRadius: 9, padding: "8px 13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}><LogOut size={15} /> {session.asSuper ? "חזרה למנהל-על" : "יציאה"}</button>
        </div>
      </div>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "20px 20px 60px" }}>
        {isSuper && <SuperAdminView state={state} setState={setState} onEnter={(sid) => setSession({ kind: "supplier", supplierId: sid, asSuper: true, from: "super" })} onEnterAs={(sess) => setSession({ ...sess, asSuper: true, from: "super" })} />}
        {isAgent && <SuperAdminView state={state} setState={setState} agentMode onEnter={(sid) => setSession({ kind: "supplier", supplierId: sid, asSuper: true, from: "superagent" })} onEnterAs={(sess) => setSession({ ...sess, asSuper: true, from: "superagent" })} />}
        {isHub && <BusinessHub state={state} setState={setState} email={session.email} onEnter={(sid) => setSession({ ...session, supplierId: sid })} onJoin={joinSupplier} />}
        {session.kind === "supplier" && <><FontLoader font={themeFont} />{subLocked(sup) && !session.asSuper ? <SubscriptionLock state={sup} setState={scopedSet} /> : <ManagerView state={sup} setState={scopedSet} intent={mgrIntent} onIntentDone={() => setMgrIntent(null)} />}</>}
        {session.kind === "client" && sup && clientRec && <div style={{ color: themeFontColor }}><FontLoader font={themeFont} /><ClientView state={sup} setState={scopedSet} clientId={clientRec.id} /></div>}
        {isStaffView && staffRoles.length > 1 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14, padding: 10, boxShadow: SH }}>
            <span style={{ fontSize: 13, color: C.sub, fontWeight: 700, alignSelf: "center", marginInlineEnd: 4 }}>התפקידים שלי:</span>
            {staffRoles.map((r) => { const on = session.kind === r; return <button key={r} onClick={() => setSession({ ...session, kind: r })} style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 13.5, padding: "8px 16px", borderRadius: 10, cursor: "pointer" }}>{ROLE_LABEL[r]}</button>; })}
          </div>
        )}
        {session.kind === "picker" && <PickerView state={sup} setState={scopedSet} me={me} />}
        {session.kind === "driver" && <DriverView state={sup} setState={scopedSet} me={me} />}
        {session.kind === "agent" && <AgentView state={sup} setState={scopedSet} me={me} />}
      </div>
      {showProfile && <ProfileModal session={session} state={state} setState={setState} sup={sup} onClose={() => setShowProfile(false)} onLoggedOut={() => { setShowProfile(false); setSession({ kind: "none" }); }} onGo={(t) => { setShowProfile(false); setMgrIntent(t); }} />}
      <AlertSound count={supAlerts} active={session.kind === "supplier"} />
      <AutoBilling state={state} setState={setState} active={isSuper} />
      {showBell && <Modal title="עדכונים חדשים" onClose={() => setShowBell(false)}>
        {(() => {
          const items = [];
          if (sup) {
            sup.orders.filter((o) => o.status === "new").sort((a, b) => b.date - a.date).forEach((o) => { const c = sup.clients.find((x) => x.id === o.clientId); items.push({ key: "o" + o.id, icon: <ClipboardList size={18} />, tone: [C.amberSoft, C.amber], title: "הזמנה חדשה #" + o.id, sub: (c ? c.name : "לקוח") + " · " + orderCartons(o) + " קרטונים", tab: "orders" }); });
            const byClient = {}; sup.messages.filter((m) => m.fromRole === "client" && !m.readBySup).forEach((m) => { byClient[m.clientId] = (byClient[m.clientId] || 0) + 1; });
            { const ss = subState(sup.sub); if (sup.sub && !isDemoSup(sup) && ss.st === "trial" && ss.left <= 7) items.push({ key: "trial", icon: <CreditCard size={18} />, tone: [C.redSoft, C.red], title: "תקופת הניסיון מסתיימת בעוד " + ss.left + " ימים", sub: "לחצו לבחירת מסלול ותשלום", tab: "subscribe" }); }
            (sup.inquiries || []).filter((q) => q.unread).forEach((q) => { items.push({ key: "q" + q.id, icon: <Mail size={18} />, tone: [C.plumSoft, C.plum], title: "פנייה מעסק חדש", sub: q.name + " · " + (q.msgs[q.msgs.length - 1] || {}).text, tab: "messages" }); });
            Object.keys(byClient).forEach((cid) => { const c = sup.clients.find((x) => x.id === cid); items.push({ key: "m" + cid, icon: <MessageSquare size={18} />, tone: [C.blueSoft, C.blue], title: "הודעה מלקוח", sub: (c ? c.name : "לקוח") + " · " + byClient[cid] + " הודעות שלא נקראו", tab: "messages" }); });
          }
          if (items.length === 0) return <Empty>אין עדכונים חדשים 🎉</Empty>;
          return <div style={{ display: "grid", gap: 8 }}>{items.map((it) => (
            <button key={it.key} onClick={() => { setMgrIntent(it.tab); setShowBell(false); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: it.tone[0], color: it.tone[1], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{it.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{it.title}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>{it.sub}</div></div>
              <ChevronLeft size={18} color={C.sub} />
            </button>
          ))}</div>;
        })()}
      </Modal>}
    </div>
  );
}

/* ============ AUTH ============ */
/* ================= גיוס ספקים: דף נחיתה + הרשמה עצמית מהירה ================= */
const autoApproveOn = (root) => !root || !root.settings || root.settings.autoApproveSuppliers !== false; // ברירת מחדל: פתוח מיד
const readUtm = () => { try { const u = new URL(window.location.href); return u.searchParams.get("utm_source") || u.searchParams.get("src") || u.searchParams.get("ref") || ""; } catch (e) { return ""; } };
const joinLink = (src) => { try { return window.location.origin + window.location.pathname + "?join=1" + (src ? "&utm_source=" + src : ""); } catch (e) { return "?join=1"; } };
const makeSupplier = (f, { plan, active, source }) => ({
  id: "s" + Date.now(), name: f.name.trim(), ...domainPatch(f.domains), regions: f.regions || "", status: active ? "active" : "pending",
  owner: { email: f.email.trim(), password: f.password, contact: f.contact.trim(), phone: f.phone.trim() }, terms: { version: TERMS_VERSION, acceptedAt: Date.now() },
  brand: { logo: "", tagline: "", color: "#1F7A4D" }, sub: newTrialSub(plan), biz: { taxId: "", address: "", phone: f.phone.trim(), email: f.email.trim() },
  cats: Array.from(new Set(f.domains.flatMap((id) => (DOMAIN_BY_ID[id] || { cats: [] }).cats))), invoiceSeq: 1000, features: { prizes: true, chat: true, minOrder: 5 },
  kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(), products: [], clients: [], staff: [], orders: [], messages: [], broadcasts: [],
  source: source || "direct", createdAt: Date.now(), onboarding: { startedAt: Date.now() },
});
// מה ספק מקבל — אותה רשימה בדף הנחיתה ובמסך ההרשמה
const LP_FEATURES = [
  ["🏪", "חנות אונליין עם השם והלוגו שלכם", "קטלוג מסודר עם מחירים ותמונות, שהלקוחות פותחים מכל טלפון — בלי להוריד אפליקציה.", "חנות משלכם"],
  ["🔔", "הזמנות מסודרות, ישר אליכם", "בלי הודעות קוליות ופתקים. כל הזמנה מגיעה עם התראה, מוכנה לליקוט.", "הזמנות 24/7"],
  ["⚖️", "ליקוט, שקילה ומשלוחים", "המלקט רואה מה להכין, הנהג רואה לאן לנסוע, ואתם רואים הכל בזמן אמת.", "ליקוט ומשלוחים"],
  ["🧾", "חשבוניות ללקוחות", "חשבונית לכל הזמנה בלחיצה, ומעקב מי שילם ומי עוד לא.", "חשבוניות וגבייה"],
  ["📸", "מצלמים חשבונית — המוצרים עולים לבד", "מצלמים חשבונית מהספק שלכם, והמערכת מעלה את המוצרים לחנות עם הכמויות והמחירים.", "סריקת חשבוניות"],
  ["📊", "הכנסות והוצאות כל חודש", "רואים כמה נכנס, כמה יצא על סחורה, ומה נשאר — עם דוח לרואה החשבון.", "דוח רווח חודשי"],
  ["🏆", "יעדים ופרסים ללקוחות", "לקוחות צוברים נקודות על כל הזמנה ומזמינים יותר.", "מועדון לקוחות"],
  ["💬", "צ'אט ומבצעים", "שולחים מבצע לכל הלקוחות בלחיצה אחת, ומדברים איתם במקום אחד.", "מבצעים וצ'אט"],
];
// ראש מסך ההרשמה: מה מקבלים, בקצרה ובצורה ברורה
function SignupIntro() {
  return (
    <div style={{ background: `radial-gradient(700px 300px at 90% 0%, rgba(249,115,22,.30), transparent), linear-gradient(160deg, #0B1F4D, #1D4ED8)`, color: "#fff", borderRadius: 22, padding: "22px 16px 18px", marginBottom: 16, boxShadow: "0 14px 40px rgba(15,31,77,.22)" }}>
      <div style={{ display: "inline-block", background: "rgba(255,255,255,.15)", borderRadius: 20, padding: "4px 12px", fontSize: 12.5, fontWeight: 700 }}>🎁 חודש ראשון חינם · בלי כרטיס אשראי</div>
      <div style={{ fontSize: "clamp(22px, 5.5vw, 28px)", fontWeight: 800, lineHeight: 1.25, margin: "10px 0 4px", letterSpacing: "-0.5px" }}>כל מה שספק צריך — <span style={{ background: "linear-gradient(90deg,#FDBA74,#F9A8D4)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>באפליקציה אחת</span></div>
      <div style={{ fontSize: 14, opacity: .9, lineHeight: 1.6, marginBottom: 14 }}>הלקוחות העסקיים שלכם מזמינים לבד מהטלפון, ואתם מקבלים הזמנה מסודרת — מוכנה לליקוט ולמשלוח.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
        {LP_FEATURES.map(([e, t, d, short]) => (
          <div key={t} title={d} style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 14, padding: "10px 10px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,.95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{e}</span>
            <span style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.3 }}>{short}</span>
          </div>))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginTop: 14, borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: 12 }}>
        {[["נרשמים", "2 דקות"], ["מעלים מוצרים", "או מצלמים חשבונית"], ["שולחים קישור", "והלקוחות מזמינים"]].map(([t, d], i) => (
          <div key={t} style={{ textAlign: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#DB2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, margin: "0 auto 4px" }}>{i + 1}</div>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{t}</div><div style={{ fontSize: 11.5, opacity: .8 }}>{d}</div>
          </div>))}
      </div>
    </div>
  );
}
const LP = { navy: "#0B1F4D", blue: "#1D4ED8", orange: "#F97316", pink: "#DB2777", soft: "#F5F7FC" };
const ctaStyle = (big) => ({ border: "none", background: `linear-gradient(135deg, ${LP.orange}, ${LP.pink})`, color: "#fff", fontWeight: 800, fontSize: big ? 18 : 15, padding: big ? "16px 28px" : "12px 20px", borderRadius: 14, cursor: "pointer", boxShadow: "0 8px 24px rgba(219,39,119,.35)", fontFamily: "inherit" });
function PhoneMock() {
  const items = [["🍅", "עגבניות", "₪6.9 לק\"ג", 3], ["🥩", "אנטריקוט", "₪89 לק\"ג", 2], ["🥖", "באגט", "₪4.5", 12]];
  return (
    <div style={{ width: 230, borderRadius: 34, background: "#0f172a", padding: 10, boxShadow: "0 30px 60px rgba(0,0,0,.35)", margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 26, overflow: "hidden", color: C.ink }}>
        <div style={{ background: `linear-gradient(135deg, ${LP.blue}, ${LP.navy})`, color: "#fff", padding: "14px 14px 12px" }}><div style={{ fontSize: 11, opacity: .8 }}>החנות שלך</div><div style={{ fontWeight: 800, fontSize: 15 }}>הזמנה חדשה</div></div>
        <div style={{ padding: 10, display: "grid", gap: 8 }}>
          {items.map(([e, n, p, q]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.line}`, borderRadius: 12, padding: "7px 8px" }}>
              <span style={{ fontSize: 20 }}>{e}</span><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 12.5 }}>{n}</div><div style={{ fontSize: 10.5, color: C.sub }}>{p}</div></div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 20, height: 20, borderRadius: 6, background: "#EEF2F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>−</span><b style={{ fontSize: 12 }}>{q}</b><span style={{ width: 20, height: 20, borderRadius: 6, background: LP.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>+</span></div>
            </div>))}
          <div style={{ background: `linear-gradient(135deg, ${LP.orange}, ${LP.pink})`, color: "#fff", borderRadius: 12, padding: "10px", textAlign: "center", fontWeight: 800, fontSize: 13 }}>שליחת הזמנה ✓</div>
          <div style={{ fontSize: 10.5, color: C.sub, textAlign: "center" }}>🔔 ההזמנה מגיעה אליך מיד</div>
        </div>
      </div>
    </div>
  );
}
function QuickSignup({ state, setState, onLogin, onCancel, source }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ name: "", contact: "", phone: "", email: "", password: "", domains: [], regions: "" });
  const [plan, setPlan] = useState("premium"); const [agree, setAgree] = useState(false);
  const [err, setErr] = useState(""); const [done, setDone] = useState(null);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const regList = f.regions ? f.regions.split(",").map((x) => x.trim()).filter(Boolean) : [];
  const toggleReg = (v) => { const next = regList.includes(v) ? regList.filter((x) => x !== v) : [...regList.filter((x) => x !== "כל הארץ"), v]; setF((s) => ({ ...s, regions: (v === "כל הארץ" && !regList.includes(v) ? ["כל הארץ"] : next).join(", ") })); };
  const next = () => {
    setErr("");
    if (step === 1) {
      if (!f.name.trim() || !f.contact.trim() || !f.phone.trim() || !f.email.trim() || !f.password) return setErr("נא למלא את כל השדות");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) return setErr("כתובת אימייל לא תקינה");
      if (f.phone.replace(/\D/g, "").length < 9) return setErr("מספר טלפון לא תקין");
      if (f.password.length < 4) return setErr("סיסמה — לפחות 4 תווים");
      const em = f.email.trim().toLowerCase();
      if (state.suppliers.some((sp) => sp.owner && (sp.owner.email || "").trim().toLowerCase() === em)) return setErr("האימייל הזה כבר רשום. אפשר להתחבר עם הסיסמה שלכם.");
    }
    if (step === 2) { if (!f.domains.length) return setErr("בחרו לפחות תחום אחד"); if (!regList.length) return setErr("בחרו איפה אתם מספקים (אפשר \"כל הארץ\")"); }
    if (step < 3) return setStep(step + 1);
    if (!agree) return setErr("יש לאשר את התקנון");
    const active = autoApproveOn(state);
    const sup = makeSupplier(f, { plan, active, source });
    setState((root) => ({ ...root, suppliers: [...root.suppliers, sup] }));
    try { const u = new URL(window.location.href); u.searchParams.delete("join"); window.history.replaceState(null, "", u.toString()); } catch (e) {}
    if (active) return onLogin({ kind: "supplier", supplierId: sup.id });
    setDone(sup);
  };
  const stepsLbl = ["פרטי העסק", "מה ולאן", "מסלול"];
  if (done) return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <div style={{ fontSize: 46 }}>🎉</div>
      <div style={{ fontWeight: 800, fontSize: 21, marginTop: 6 }}>תודה, {done.owner.contact}!</div>
      <div style={{ fontSize: 14.5, color: C.sub, marginTop: 8, lineHeight: 1.7 }}>קיבלנו את ההרשמה של <b>{done.name}</b>.<br />החשבון יאושר בהקדם ותקבלו גישה עם האימייל והסיסמה שבחרתם.<br />חודש הניסיון יתחיל מיום האישור.</div>
      <button onClick={onCancel} style={{ ...ctaStyle(false), marginTop: 16 }}>סגור</button>
    </div>
  );
  const inp = (label, k, extra = {}) => <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{label}</div><input value={f[k]} onChange={set(k)} {...extra} style={{ ...fieldStyle, padding: "13px 12px", fontSize: 16 }} /></label>;
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>{stepsLbl.map((l, i) => <div key={l} style={{ flex: 1, height: 6, borderRadius: 6, background: i < step ? `linear-gradient(90deg, ${LP.orange}, ${LP.pink})` : "#E5E9F0" }} />)}</div>
      <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 14 }}>שלב {step} מתוך 3 · <b style={{ color: C.ink }}>{stepsLbl[step - 1]}</b></div>
      {step === 1 && <div className="tp-2eq" style={{ display: "grid", gap: "0 10px" }}>
        {inp("שם העסק", "name", { placeholder: "למשל: אטליז השכונה", autoComplete: "organization" })}
        {inp("השם שלך", "contact", { placeholder: "שם מלא", autoComplete: "name" })}
        {inp("טלפון", "phone", { placeholder: "050-0000000", inputMode: "tel", autoComplete: "tel", dir: "ltr" })}
        {inp("אימייל (לכניסה)", "email", { placeholder: "you@example.com", inputMode: "email", autoComplete: "email", dir: "ltr" })}
        {inp("בחרו סיסמה", "password", { type: "password", autoComplete: "new-password" })}
      </div>}
      {step === 2 && <div>
        <DomainPicker required selected={f.domains} onChange={(ids) => setF((s) => ({ ...s, domains: ids }))} />
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>איפה אתם מספקים? *</div>
          <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 10 }}>לקוחות באזורים האלה ימצאו אתכם בחיפוש. אפשר לשנות אחר כך.</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["כל הארץ", ...Object.keys(AREAS)].map((ar) => { const on = regList.includes(ar); return <button key={ar} type="button" onClick={() => toggleReg(ar)} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.ink, borderRadius: 20, padding: "7px 14px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>{ar === "כל הארץ" ? "🇮🇱 " : ""}{ar}{on ? " ✓" : ""}</button>; })}</div>
        </div>
      </div>}
      {step === 3 && <div>
        <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", color: "#9A3412", borderRadius: 12, padding: "10px 14px", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🎁 מתחילים בחודש ניסיון חינם — בלי כרטיס אשראי. בחרו את המסלול שתרצו לנסות:</div>
        <PlanCompare selected={plan} onSelect={setPlan} />
        <div style={{ fontSize: 12.5, color: C.sub, marginTop: 8 }}>אחרי החודש: {planPriceText(planOf(plan))} לחודש — רק אם תבחרו להמשיך. תקבלו תזכורת לפני שהניסיון נגמר.</div>
        <TermsBox agree={agree} setAgree={setAgree} />
      </div>}
      {err && <ErrBox>{err}</ErrBox>}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : onCancel()} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 15, padding: "14px 18px", borderRadius: 14, cursor: "pointer", fontFamily: "inherit" }}>{step > 1 ? "→ חזרה" : "ביטול"}</button>
        <button onClick={next} style={{ ...ctaStyle(false), flex: 1, fontSize: 16, padding: "14px" }}>{step < 3 ? "המשך ←" : "🚀 פתחו לי את החנות"}</button>
      </div>
    </div>
  );
}
function SupplierLanding({ state, setState, onLogin, onBack, source }) {
  const [signup, setSignup] = useState(false); const [login, setLogin] = useState(false); const [faq, setFaq] = useState(null);
  const open = () => { setSignup(true); setTimeout(() => { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} }, 20); };
  const sec = { maxWidth: 1080, margin: "0 auto", padding: "46px 18px" };
  const h2 = { fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 8px", letterSpacing: "-0.5px" };
  const lead = { fontSize: 15.5, color: C.sub, textAlign: "center", margin: "0 auto 26px", maxWidth: 620, lineHeight: 1.7 };
  const features = LP_FEATURES;
  const faqs = [
    ["צריך כרטיס אשראי כדי להתחיל?", "לא. חודש הניסיון חינם לגמרי ובלי כרטיס. רק אם תחליטו להמשיך, תשלמו באשראי מתוך האפליקציה."],
    ["כמה זמן לוקח להקים את החנות?", "ההרשמה לוקחת כ-2 דקות. אחרי זה מוסיפים מוצרים (או מצלמים חשבונית ספק והם עולים לבד), ושולחים ללקוחות קישור."],
    ["הלקוחות שלי צריכים להוריד אפליקציה?", "לא. הם מקבלים קישור לחנות שלכם, נרשמים פעם אחת ומזמינים מהדפדפן בטלפון או במחשב."],
    ["אני עובד בכל הארץ — זה מתאים?", "בהחלט. הכל אונליין, בלי סוכן ובלי פגישה. אתם בוחרים לאילו אזורים אתם מספקים, ולקוחות מהאזורים האלה מוצאים אתכם."],
    ["מה קורה בסוף חודש הניסיון?", "תקבלו תזכורות לפני הסיום. אם תרצו להמשיך — בוחרים מסלול ומשלמים. אם לא — פשוט לא ממשיכים, בלי חיוב."],
    ["אפשר לבטל?", "כן, בכל עת, ישירות מהאפליקציה. אין התחייבות."],
    ["זה מתאים לתחום שלי?", "B2B+ בנויה לספקים שמוכרים לעסקים: " + SUP_DOMAINS.map((d) => d.label).join(", ") + "."],
  ];
  return (
    <div dir="rtl" style={{ minHeight: "100vh", fontFamily: FONT, color: C.ink, background: "#fff", paddingBottom: signup ? 0 : 76 }}>
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_IMG} alt="B2B+" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover" }} />
          <div style={{ lineHeight: 1.1 }}><div style={{ fontWeight: 800, fontSize: 16 }}><bdi dir="ltr">B2B+</bdi></div><div style={{ fontSize: 11, color: C.sub }}>לספקים</div></div>
          <span style={{ flex: 1 }} />
          <button onClick={() => { setLogin(true); setSignup(false); }} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.ink, fontWeight: 700, fontSize: 13.5, padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>כניסה</button>
          {!signup && <button onClick={open} style={{ ...ctaStyle(false), padding: "9px 16px", fontSize: 14 }}>הרשמה בחינם</button>}
        </div>
      </div>
      {(signup || login) ? (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "18px 14px 60px" }}>
          {signup && <SignupIntro />}
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 20, padding: "22px 18px", boxShadow: "0 12px 40px rgba(15,31,77,.10)" }}>
            {signup && <><div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>פותחים חנות בחינם</div><div style={{ fontSize: 14, color: C.sub, marginBottom: 16 }}>3 שלבים קצרים · חודש ניסיון · בלי כרטיס אשראי</div><QuickSignup state={state} setState={setState} onLogin={onLogin} onCancel={() => setSignup(false)} source={source} /></>}
            {login && <LoginForm state={state} onLogin={onLogin} back={() => setLogin(false)} onForgot={() => setLogin(false)} />}
          </div>
        </div>
      ) : (<>
        <div style={{ background: `radial-gradient(900px 400px at 85% 0%, rgba(249,115,22,.35), transparent), linear-gradient(160deg, ${LP.navy}, ${LP.blue})`, color: "#fff" }}>
          <div style={{ ...sec, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30, paddingTop: 40 }}>
            <div style={{ flex: "1 1 340px" }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,.14)", borderRadius: 20, padding: "5px 12px", fontSize: 13, fontWeight: 700, marginBottom: 14 }}>🇮🇱 לספקים שמוכרים לעסקים · בכל הארץ</div>
              <h1 style={{ fontSize: "clamp(30px, 6vw, 46px)", lineHeight: 1.15, margin: 0, fontWeight: 800, letterSpacing: "-1px" }}>הלקוחות מזמינים לבד.<br /><span style={{ background: `linear-gradient(90deg, #FDBA74, #F9A8D4)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>אתם רק מכינים ושולחים.</span></h1>
              <p style={{ fontSize: 17, lineHeight: 1.7, opacity: .92, margin: "16px 0 22px", maxWidth: 520 }}>חנות דיגיטלית לספקים — מסעדות, מכולות וקפה מזמינים מכם 24/7 מהטלפון, וההזמנה מגיעה אליכם מסודרת. בלי טלפונים, בלי פתקים, בלי טעויות.</p>
              <button onClick={open} style={ctaStyle(true)}>פתחו חנות בחינם ←</button>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 14, fontSize: 13.5, opacity: .95 }}><span>✓ חודש ניסיון חינם</span><span>✓ בלי כרטיס אשראי</span><span>✓ בלי סוכן ובלי פגישה</span><span>✓ ביטול בכל עת</span></div>
            </div>
            <div style={{ flex: "0 1 260px", margin: "0 auto" }}><PhoneMock /></div>
          </div>
        </div>
        <div style={{ background: LP.soft }}><div style={sec}>
          <h2 style={h2}>מכירים את זה?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12, marginTop: 18 }}>
            {[["📞", "הזמנות בטלפון ובוואטסאפ בכל שעה"], ["📝", "פתקים, הקלטות ו\"שכחתי לרשום\""], ["❌", "טעויות בליקוט ולקוחות לא מרוצים"], ["💸", "לא ברור מי שילם ומי חייב"]].map(([e, t]) => <div key={t} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", display: "flex", gap: 12, alignItems: "center", border: `1px solid ${C.line}` }}><span style={{ fontSize: 26 }}>{e}</span><span style={{ fontWeight: 700, fontSize: 15 }}>{t}</span></div>)}
          </div>
          <div style={{ textAlign: "center", fontWeight: 800, fontSize: 18, marginTop: 22 }}>עם B2B+ כל זה נגמר — והכל במקום אחד.</div>
        </div></div>
        <div style={sec}>
          <h2 style={h2}>איך זה עובד?</h2><p style={lead}>אין צורך בסוכן או בהדרכה. כל אחד יכול להתחיל לבד, תוך דקות.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
            {[["1", "נרשמים", "2 דקות: שם העסק, מה אתם מוכרים ולאן אתם מספקים."], ["2", "מעלים מוצרים", "מקלידים, או פשוט מצלמים חשבונית ספק — והמוצרים עולים לחנות לבד."], ["3", "שולחים קישור ללקוחות", "בוואטסאפ או במייל. הלקוחות נרשמים ומתחילים להזמין."]].map(([n, t, d]) => (
              <div key={n} style={{ border: `1px solid ${C.line}`, borderRadius: 18, padding: 20, background: "#fff" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${LP.orange}, ${LP.pink})`, color: "#fff", fontWeight: 800, fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 12 }}>{t}</div><div style={{ fontSize: 14.5, color: C.sub, marginTop: 6, lineHeight: 1.6 }}>{d}</div>
              </div>))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}><button onClick={open} style={ctaStyle(true)}>מתחילים עכשיו ←</button></div>
        </div>
        <div style={{ background: LP.soft }}><div style={sec}>
          <h2 style={h2}>כל מה שספק צריך</h2><p style={lead}>מההזמנה ועד החשבונית — בלי לעבור בין אפליקציות.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
            {features.map(([e, t, d]) => <div key={t} style={{ background: "#fff", borderRadius: 16, padding: 18, border: `1px solid ${C.line}` }}><div style={{ fontSize: 28 }}>{e}</div><div style={{ fontWeight: 800, fontSize: 16, marginTop: 8 }}>{t}</div><div style={{ fontSize: 14, color: C.sub, marginTop: 6, lineHeight: 1.6 }}>{d}</div></div>)}
          </div>
        </div></div>
        <div style={sec}>
          <h2 style={h2}>מתאים לכל ספק שמוכר לעסקים</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 16 }}>{SUP_DOMAINS.map((d) => <span key={d.id} style={{ border: `1px solid ${C.line}`, borderRadius: 20, padding: "8px 14px", fontSize: 14, fontWeight: 700, background: "#fff" }}>{d.emoji} {d.label}</span>)}</div>
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 15, color: C.sub }}>🇮🇱 עובדים מכל מקום בארץ — הכל אונליין, בלי סוכן.</div>
        </div>
        <div style={{ background: LP.soft }}><div style={sec}>
          <h2 style={h2}>מחירים פשוטים</h2><p style={lead}>מתחילים בחודש ניסיון חינם. ממשיכים רק אם זה מתאים לכם.</p>
          <div style={{ maxWidth: 760, margin: "0 auto" }}><PlanCompare selected={null} onSelect={open} /></div>
          <div style={{ textAlign: "center", marginTop: 22 }}><button onClick={open} style={ctaStyle(true)}>לחודש ניסיון חינם ←</button><div style={{ fontSize: 13, color: C.sub, marginTop: 8 }}>בלי כרטיס אשראי · ביטול בכל עת</div></div>
        </div></div>
        <div style={sec}>
          <h2 style={h2}>שאלות נפוצות</h2>
          <div style={{ maxWidth: 720, margin: "18px auto 0", display: "grid", gap: 8 }}>{faqs.map(([q, a], i) => (
            <div key={q} style={{ border: `1px solid ${C.line}`, borderRadius: 14, background: "#fff", overflow: "hidden" }}>
              <button onClick={() => setFaq(faq === i ? null : i)} style={{ width: "100%", textAlign: "right", border: "none", background: "transparent", padding: "14px 16px", fontWeight: 800, fontSize: 15.5, cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 10, fontFamily: "inherit", color: C.ink }}><span>{q}</span><span style={{ color: LP.pink, fontSize: 20, lineHeight: 1 }}>{faq === i ? "−" : "+"}</span></button>
              {faq === i && <div style={{ padding: "0 16px 14px", fontSize: 14.5, color: C.sub, lineHeight: 1.7 }}>{a}</div>}
            </div>))}</div>
        </div>
        <div style={{ background: `linear-gradient(160deg, ${LP.navy}, ${LP.blue})`, color: "#fff" }}><div style={{ ...sec, textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>החנות שלכם יכולה לקבל הזמנות כבר היום</div>
          <div style={{ fontSize: 16, opacity: .9, margin: "10px 0 20px" }}>הרשמה של 2 דקות · חודש ניסיון חינם · בלי כרטיס אשראי</div>
          <button onClick={open} style={ctaStyle(true)}>פתחו חנות בחינם ←</button>
          {onBack && <div><button onClick={onBack} style={{ marginTop: 18, border: "none", background: "transparent", color: "rgba(255,255,255,.8)", textDecoration: "underline", cursor: "pointer", fontFamily: "inherit" }}>לדף הכניסה הראשי</button></div>}
        </div></div>
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, padding: "10px 14px calc(10px + env(safe-area-inset-bottom, 0px))", background: "rgba(255,255,255,.95)", borderTop: `1px solid ${C.line}`, backdropFilter: "blur(8px)" }}>
          <button onClick={open} style={{ ...ctaStyle(false), width: "100%", maxWidth: 520, display: "block", margin: "0 auto", fontSize: 16, padding: "14px" }}>🎁 חודש ניסיון חינם — הרשמה ב-2 דקות</button>
        </div>
      </>)}
    </div>
  );
}
// צ'קליסט "צעדים ראשונים" לספק חדש שנרשם לבד
function OnboardingCard({ state, setState, go }) {
  const ob = state.onboarding; if (!ob || ob.dismissed || isDemoSup(state)) return null;
  const steps = [
    { id: "products", t: "הוסיפו מוצרים לחנות", d: "הקלידו מוצרים — או צלמו חשבונית ספק והם יעלו לבד", done: state.products.length > 0, go: () => go("mystore", "products"), cta: "למוצרים" },
    hasFeature(state, "design") && { id: "design", t: "הוסיפו לוגו וצבעים", d: "שהחנות תיראה כמו העסק שלכם", done: !!(state.brand && state.brand.logo), go: () => go("mystore", "design"), cta: "לעיצוב" },
    { id: "share", t: "שלחו קישור ללקוחות", d: "בוואטסאפ או במייל — והם יכולים להתחיל להזמין", done: !!state.sharedAt, go: () => go("mystore", "share"), cta: "לשיתוף" },
    { id: "order", t: "קבלו הזמנה ראשונה 🎉", d: "ברגע שלקוח מזמין — תקבלו התראה", done: state.orders.length > 0, go: () => go("orders"), cta: "להזמנות" },
  ].filter(Boolean);
  const n = steps.filter((x) => x.done).length;
  if (n === steps.length) return null;
  const nextStep = steps.find((x) => !x.done);
  return (
    <Panel style={{ boxShadow: SH, marginBottom: 16, borderColor: "#FED7AA", background: "linear-gradient(135deg,#FFF7ED,#fff 60%)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 24 }}>🚀</div>
        <div style={{ flex: 1, minWidth: 180 }}><div style={{ fontWeight: 800, fontSize: 17 }}>צעדים ראשונים לחנות שלך</div><div style={{ fontSize: 13, color: C.sub }}>{n} מתוך {steps.length} הושלמו · הצעד הבא: {nextStep.t}</div></div>
        <button onClick={() => setState((s) => ({ ...s, onboarding: { ...(s.onboarding || {}), dismissed: true } }))} style={{ border: "none", background: "transparent", color: C.sub, fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}>הסתר</button>
      </div>
      <div style={{ height: 8, borderRadius: 8, background: "#FDE7D3", margin: "12px 0" }}><div style={{ height: "100%", width: (n / steps.length * 100) + "%", borderRadius: 8, background: `linear-gradient(90deg, ${LP.orange}, ${LP.pink})` }} /></div>
      <div style={{ display: "grid", gap: 8 }}>{steps.map((x, i) => (
        <button key={x.id} onClick={x.go} className="tp-click" style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "right", border: `1px solid ${x === nextStep ? "#FDBA74" : C.line}`, background: x.done ? "#F6FBF7" : "#fff", borderRadius: 12, padding: "10px 12px", cursor: "pointer", font: "inherit", color: "inherit" }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, background: x.done ? C.green : (x === nextStep ? `linear-gradient(135deg, ${LP.orange}, ${LP.pink})` : "#EEF2F7"), color: x.done || x === nextStep ? "#fff" : C.sub }}>{x.done ? <Check size={15} /> : i + 1}</span>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 14.5, textDecoration: x.done ? "line-through" : "none", color: x.done ? C.sub : C.ink }}>{x.t}</div>{!x.done && <div style={{ fontSize: 12.5, color: C.sub }}>{x.d}</div>}</div>
          {!x.done && <span style={{ fontSize: 12.5, fontWeight: 800, color: LP.pink }}>{x.cta} ›</span>}
        </button>))}</div>
    </Panel>
  );
}
// מנהל-על: גיוס ספקים — קישורים לפרסום, אישור אוטומטי ומקורות הגעה
function RecruitPanel({ state, setState }) {
  const [copied, setCopied] = useState(""); const [open, setOpen] = useState(false);
  const auto = autoApproveOn(state);
  const copy = (src) => { try { navigator.clipboard.writeText(joinLink(src)); } catch (e) {} setCopied(src || "main"); setTimeout(() => setCopied(""), 1600); };
  const sups = state.suppliers.filter((x) => !isDemoSup(x));
  const recent = sups.filter((x) => x.createdAt && Date.now() - x.createdAt < 30 * DAY_MS);
  const bySrc = {}; recent.forEach((x) => { const k = x.source || "direct"; bySrc[k] = (bySrc[k] || 0) + 1; });
  const SRC = [["facebook", "פייסבוק / אינסטגרם"], ["google", "גוגל"], ["tiktok", "טיקטוק"], ["whatsapp", "וואטסאפ"]];
  const srcName = (k) => (SRC.find((x) => x[0] === k) || [k, k === "direct" ? "ישיר" : k])[1];
  return (
    <Panel style={{ boxShadow: SH, borderColor: "#FED7AA" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", border: "none", background: "transparent", padding: 0, cursor: "pointer", textAlign: "right", display: "flex", alignItems: "center", gap: 10, font: "inherit", color: "inherit" }}>
        <span style={{ fontSize: 24 }}>📣</span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 16 }}>גיוס ספקים בפרסום</div><div style={{ fontSize: 12.5, color: C.sub }}>{recent.length} ספקים נרשמו ב-30 יום האחרונים · {auto ? "פתיחה מיידית (ללא אישור)" : "דורש אישור שלך"}</div></div>
        <ChevronLeft size={18} color={C.sub} style={{ transform: open ? "rotate(-90deg)" : "none" }} />
      </button>
      {open && <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>קישור לדף ההרשמה (לשים במודעות)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><input readOnly value={joinLink("")} onFocus={(e) => e.target.select()} dir="ltr" style={{ ...fieldStyle, flex: 1, minWidth: 220, background: "#F7F9FC" }} /><button onClick={() => copy("")} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 800, padding: "0 18px", borderRadius: 10, cursor: "pointer" }}>{copied === "main" ? "הועתק ✓" : "העתק"}</button><a href={joinLink("")} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 14px", color: C.blue, fontWeight: 700, textDecoration: "none" }}>צפייה ↗</a></div>
          <div style={{ fontSize: 12.5, color: C.sub, marginTop: 8 }}>קישור נפרד לכל ערוץ — כדי לדעת מאיפה הגיע כל ספק:</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>{SRC.map(([k, l]) => <button key={k} onClick={() => copy(k)} style={{ border: `1px solid ${C.line}`, background: copied === k ? C.greenSoft : "#fff", color: copied === k ? C.greenDeep : C.ink, borderRadius: 20, padding: "6px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{copied === k ? "✓ הועתק" : "🔗 " + l}</button>)}</div>
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#F7F9FC", borderRadius: 12, padding: "10px 12px", cursor: "pointer" }}>
          <input type="checkbox" checked={auto} onChange={(e) => setState((r) => ({ ...r, settings: { ...(r.settings || {}), autoApproveSuppliers: e.target.checked } }))} style={{ marginTop: 3 }} />
          <div><div style={{ fontWeight: 800, fontSize: 14 }}>פתיחה מיידית לספקים שנרשמים לבד</div><div style={{ fontSize: 12.5, color: C.sub }}>{auto ? "ספק שנרשם נכנס מיד לחנות שלו ומתחיל חודש ניסיון — בלי לחכות לך. מומלץ לפרסום." : "כבוי: כל ספק חדש ממתין לאישור שלך ברשימת הספקים."}</div></div>
        </label>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>מאיפה הגיעו (30 יום אחרונים)</div>
          {recent.length === 0 ? <div style={{ fontSize: 13, color: C.sub }}>עדיין אין הרשמות</div> : <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{Object.entries(bySrc).sort((a, b) => b[1] - a[1]).map(([k, n]) => <Badge key={k} tone="blue">{srcName(k)} · {n}</Badge>)}</div>}
        </div>
      </div>}
    </Panel>
  );
}
function AuthScreen({ state, setState, onLogin }) {
  const [mode, setMode] = useState("menu");
  if (mode === "landing") return <SupplierLanding state={state} setState={setState} onLogin={onLogin} onBack={() => setMode("menu")} source={readUtm()} />;
  return (
    <div dir="rtl" style={{ minHeight: "100vh", color: C.ink, fontFamily: FONT, display: "flex", flexDirection: "column", alignItems: "center", padding: "44px 16px", background: `radial-gradient(1200px 500px at 50% -8%, ${C.greenSoft}, ${C.bg})` }}>
      <div style={{ marginBottom: 12 }}><Logo size={122} /></div>
      <div style={{ color: C.blue, fontWeight: 800, fontSize: 16, marginBottom: 4 }}>B2B+ Marketplace</div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 22 }}>ממשק הזמנות מהספק לעסק · כל ספק, החנות שלו</div>
      {mode === "menu" && (
        <div style={{ width: "100%", maxWidth: 380, display: "grid", gap: 12 }}>
          <BigBtn icon={<LogIn size={18} />} onClick={() => setMode("login")} primary>התחברות</BigBtn>
          <button onClick={() => setMode("landing")} className="tp-click" style={{ border: "none", borderRadius: 14, padding: "14px 16px", cursor: "pointer", background: `linear-gradient(135deg, ${LP.orange}, ${LP.pink})`, color: "#fff", textAlign: "right", fontFamily: "inherit", boxShadow: "0 8px 22px rgba(219,39,119,.28)" }}><div style={{ fontWeight: 800, fontSize: 16 }}>🏪 ספק? פתחו חנות בחינם</div><div style={{ fontSize: 12.5, opacity: .92, marginTop: 2 }}>חודש ניסיון · בלי כרטיס אשראי · הרשמה ב-2 דקות</div></button>
          <BigBtn icon={<UserPlus size={18} />} onClick={() => setMode("register")}>הרשמת עסק (לקוח)</BigBtn>
        </div>
      )}
      {mode === "login" && <LoginForm state={state} onLogin={onLogin} back={() => setMode("menu")} onForgot={() => setMode("forgot")} />}
      {mode === "forgot" && <ForgotForm state={state} back={() => setMode("login")} />}
      {mode === "supreg" && <SupplierRegister state={state} setState={setState} back={() => setMode("menu")} />}
      {mode === "register" && <RegisterForm state={state} setState={setState} back={() => setMode("menu")} />}
    </div>
  );
}
function SupplierRegister({ state, setState, back, byAdmin, onDone }) {
  const [f, setF] = useState({ name: "", domains: [], cats: [], regions: "", contact: "", phone: "", email: "", password: "" });
  const [err, setErr] = useState(""); const [done, setDone] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const [agree, setAgree] = useState(false); const [showTerms, setShowTerms] = useState(false);
  const [plan, setPlan] = useState("premium"); const [start, setStart] = useState("trial"); // trial = חודש ניסיון, pay = מנוי מיידי
  const [payFor, setPayFor] = useState(null); const [paid, setPaid] = useState(false);
  const pl = planOf(plan);
  const regList = f.regions ? f.regions.split(",").map((x) => x.trim()).filter(Boolean) : [];
  const hasReg = (v) => regList.includes(v);
  const toggleReg = (v) => { const next = hasReg(v) ? regList.filter((x) => x !== v) : [...regList, v]; setF((s) => ({ ...s, regions: next.join(", ") })); };
  const submit = () => {
    if (!f.name || !f.email || !f.password) return setErr("שם, אימייל וסיסמה חובה");
    if (!f.domains.length) return setErr("יש לבחור לפחות תחום פעילות אחד");
    if (!byAdmin && !agree) return setErr("יש לאשר את התקנון כדי להמשיך");
    const em = f.email.trim().toLowerCase();
    if (state.suppliers.some((sp) => sp.owner && sp.owner.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום כספק");
    const sup = { id: "s" + Date.now(), name: f.name, ...domainPatch(f.domains), regions: f.regions || "", status: byAdmin ? "active" : "pending", owner: { email: f.email, password: f.password, contact: f.contact, phone: f.phone }, terms: byAdmin ? null : { version: TERMS_VERSION, acceptedAt: Date.now() }, brand: { logo: "", tagline: "", color: "#1F7A4D" }, sub: newTrialSub(plan), biz: { taxId: "", address: "", phone: f.phone || "", email: f.email || "" }, cats: f.cats || [], invoiceSeq: 1000, features: { prizes: true, chat: true, minOrder: 5 }, kgPerPoint: 10, periodMonths: 1, prizeTiers: defaultTiers(), products: [], clients: [], staff: [], orders: [], messages: [], broadcasts: [] };
    setState((root) => ({ ...root, suppliers: [...root.suppliers, sup] }));
    if (start === "pay") return setPayFor(sup); // פותח את טופס האשראי
    if (byAdmin && onDone) return onDone();
    setDone(true);
  };
  const finish = () => { setPayFor(null); if (byAdmin && onDone) return onDone(); setDone(true); };
  const payModal = payFor && <CardChargeModal self={!byAdmin} sups={[payFor]} sp={payFor} planId={plan} byName={byAdmin ? "מנהל-על" : "הספק (בהרשמה)"} onClose={finish} onCharged={(sp, inv) => { setPaid(true); setState((root) => ({ ...root, suppliers: root.suppliers.map((x) => x.id === sp.id ? { ...x, sub: applyCharge(x.sub, inv, true) } : x) })); }} onPreview={finish} />;
  if (done) return (<Card title="הבקשה נשלחה" back={back}><div style={{ textAlign: "center", padding: "10px 0" }}><div style={{ width: 54, height: 54, borderRadius: "50%", background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Clock size={26} /></div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>תודה, {f.name}!</div><div style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>הבקשה ממתינה לאישור מנהל-על. לאחר האישור תוכל להתחבר ולהקים את החנות שלך.</div><div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 700, color: paid ? C.greenDeep : "#7A5A17", background: paid ? C.greenSoft : C.amberSoft, borderRadius: 10, padding: "9px 12px" }}>{paid ? "✓ המנוי במסלול " + pl.name + " שולם ויופעל עם האישור" : "🎁 חודש ניסיון במסלול " + pl.name + " — מתחיל מיום האישור"}</div></div><SubmitBtn onClick={back}>חזרה</SubmitBtn></Card>);
  const body = (
    <>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם החנות / הספק *" value={f.name} onChange={set("name")} />
        <Field label="איש קשר" value={f.contact} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone} onChange={set("phone")} />
        <Field label="אימייל (לכניסה) *" value={f.email} onChange={set("email")} />
        <Field label="סיסמה *" type="password" value={f.password} onChange={set("password")} />
      </div>
      <DomainPicker required selected={f.domains} onChange={(ids) => setF((s) => ({ ...s, domains: ids, cats: Array.from(new Set(ids.flatMap((id) => (DOMAIN_BY_ID[id] || { cats: [] }).cats))) }))} />
      {f.cats && f.cats.length > 0 && <div style={{ fontSize: 12.5, color: C.greenDeep, marginBottom: 6 }}>קטגוריות מוצרים שייפתחו בחנות: {f.cats.join(" · ")} (אפשר לשנות אחר כך)</div>}
      <div style={{ marginTop: 12, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>אזורי פעילות</div>
        <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 10 }}>סמנו את כל האזורים והערים שבהם אתם מספקים — כך לקוחות באזורים אלה ימצאו אתכם בחיפוש.</div>
        {Object.keys(AREAS).map((ar) => (
          <div key={ar} style={{ marginBottom: 10 }}>
            <button type="button" onClick={() => toggleReg(ar)} style={{ border: `1.5px solid ${hasReg(ar) ? C.green : C.line}`, background: hasReg(ar) ? C.green : "#fff", color: hasReg(ar) ? "#fff" : C.ink, borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer", marginBottom: 6 }}>{ar}{hasReg(ar) ? " ✓" : ""}</button>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{(AREAS[ar] || []).map((ct) => <button key={ct} type="button" onClick={() => toggleReg(ct)} style={{ border: `1px solid ${hasReg(ct) ? C.green : C.line}`, background: hasReg(ct) ? C.greenSoft : "#fff", color: hasReg(ct) ? C.greenDeep : C.sub, borderRadius: 16, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{ct}{hasReg(ct) ? " ✓" : ""}</button>)}</div>
          </div>
        ))}
        {regList.length > 0 && <div style={{ fontSize: 12.5, color: C.greenDeep, marginTop: 6 }}>נבחרו: {regList.join(", ")}</div>}
      </div>
      <div style={{ marginTop: 14, border: `1px solid ${C.line}`, borderRadius: 12, padding: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>בחירת מסלול</div>
        <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 12 }}>מה כלול בכל מסלול — ✓ כלול · ✗ לא כלול. אפשר להחליף מסלול בכל זמן.</div>
        <PlanCompare selected={plan} onSelect={setPlan} />
        <div style={{ fontWeight: 700, fontSize: 14, margin: "14px 0 8px" }}>איך להתחיל?</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
          {[["trial", "🎁 חודש ניסיון חינם", TRIAL_DAYS + " יום בלי חיוב. לפני הסיום תקבלו תזכורת, ואז " + planPriceText(pl) + " לחודש"], ["pay", "💳 מנוי מיידי", planPriceText(pl) + " לחודש · תשלום באשראי עכשיו"]].map(([k, t, d]) => <button key={k} type="button" onClick={() => setStart(k)} style={{ textAlign: "right", border: `1.5px solid ${start === k ? C.green : C.line}`, background: start === k ? C.greenSoft : "#fff", borderRadius: 12, padding: "10px 12px", cursor: "pointer", font: "inherit", color: "inherit" }}><div style={{ fontWeight: 800, fontSize: 14 }}>{t}</div><div style={{ fontSize: 12, color: C.sub, marginTop: 3, lineHeight: 1.5 }}>{d}</div></button>)}
        </div>
        <div style={{ marginTop: 10, background: "#F7F9FC", borderRadius: 10, padding: "9px 12px", fontSize: 13.5 }}>בחרת: <b>מסלול {pl.name}</b> · {start === "trial" ? "חודש ניסיון חינם, אחר כך " + planPriceText(pl) + " לחודש" : planPriceText(pl) + " לחודש"}</div>
      </div>
      {!byAdmin && <TermsBox agree={agree} setAgree={setAgree} />}
      {err && <ErrBox>{err}</ErrBox>}<SubmitBtn onClick={submit}>{start === "pay" ? "המשך לתשלום · " + pl.name + " · " + planPriceText(pl) : byAdmin ? "הוסף ספק · חודש ניסיון במסלול " + pl.name : "שליחת בקשה · חודש ניסיון במסלול " + pl.name}</SubmitBtn>
      {payModal}
      {showTerms && <Modal onClose={() => setShowTerms(false)} title="תקנון השימוש"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: C.ink, lineHeight: 1.7, maxHeight: 360, overflow: "auto" }}>{TERMS}</div></Modal>}
    </>
  );
  return byAdmin ? body : <Card title="הרשמת ספק חדש" back={back} wide>{body}</Card>;
}
function PlanCompare({ selected, onSelect, current }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 }}>
      {Object.values(PLANS).map((pl) => { const on = selected === pl.id; const prem = pl.id === "premium"; return (
        <button key={pl.id} type="button" onClick={() => onSelect && onSelect(pl.id)} style={{ textAlign: "right", border: `2px solid ${on ? (prem ? C.plum : C.green) : C.line}`, background: on ? (prem ? "#FBF8FF" : "#F6FBF7") : "#fff", borderRadius: 14, padding: 14, cursor: onSelect ? "pointer" : "default", position: "relative", font: "inherit", color: "inherit" }}>
          {prem && <span style={{ position: "absolute", top: -10, left: 12, background: C.plum, color: "#fff", fontSize: 11, fontWeight: 800, borderRadius: 20, padding: "3px 10px" }}>הכל כלול</span>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: prem ? C.plum : C.greenDeep }}>{pl.name}</div>
            {on ? <span style={{ width: 22, height: 22, borderRadius: "50%", background: prem ? C.plum : C.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={14} /></span> : <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${C.line}` }} />}
          </div>
          <div style={{ fontSize: 12.5, color: C.sub, marginTop: 2 }}>{pl.tagline}</div>
          <div style={{ marginTop: 8 }}><span style={{ fontWeight: 800, fontSize: 24 }}>{NIS(pl.price)}</span><span style={{ fontSize: 12.5, color: C.sub }}> לחודש + מע"מ</span></div>
          <div style={{ fontSize: 12, color: C.sub }}>סה"כ לתשלום {NIS(planGross(pl))} לחודש כולל מע"מ</div>
          {current === pl.id && <div style={{ fontSize: 11.5, color: C.blue, fontWeight: 700, marginTop: 2 }}>המסלול הנוכחי</div>}
          <div style={{ display: "grid", gap: 5, marginTop: 10, borderTop: `1px dashed ${C.line}`, paddingTop: 10 }}>
            {PLAN_FEATURES.map((f) => { const inc = prem || f.basic; return (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: inc ? C.ink : "#9AA6A0" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: inc ? C.greenSoft : C.redSoft, color: inc ? C.greenDeep : C.red }}>{inc ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}</span>
                <span style={{ textDecoration: inc ? "none" : "line-through" }}>{f.label}</span>
              </div>); })}
          </div>
        </button>); })}
    </div>
  );
}
// הוספת / חידוש מנוי ע"י מנהל-על: חודש ניסיון או מנוי בתשלום, בסיסי או פרימיום
function AddSubModal({ sups, preset, onClose, onSave, onChargeCard }) {
  const [sid, setSid] = useState(preset ? preset.id : (sups[0] ? sups[0].id : ""));
  const sp = sups.find((x) => x.id === sid);
  const [kind, setKind] = useState("trial"); const [plan, setPlan] = useState((sp && sp.sub && planOf(sp.sub.plan).id) || "premium"); 
  const ends = new Date(Date.now() + TRIAL_DAYS * DAY_MS).toLocaleDateString("he-IL");
  const save = () => {
    if (!sp) return;
    if (kind === "trial") return onSave(sp, newTrialSub(plan, sp.sub));
    return onChargeCard(sp, plan);
  };
  return (
    <Modal onClose={onClose} title={preset ? "חידוש מנוי · " + preset.name : "הוספת מנוי"}>
      {!preset && <label style={{ display: "block", marginBottom: 12 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>ספק</div><select value={sid} onChange={(e) => setSid(e.target.value)} style={fieldStyle}>{sups.map((x) => <option key={x.id} value={x.id}>{x.name} · {subState(x.sub).label}</option>)}</select></label>}
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>סוג</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[["trial", "🎁 חודש ניסיון", "חינם ל-" + TRIAL_DAYS + " יום · עד " + ends], ["paid", "💳 מנוי בתשלום", "מתחדש כל חודש עד לביטול"]].map(([k, t, d]) => <button key={k} onClick={() => setKind(k)} style={{ textAlign: "right", border: `1.5px solid ${kind === k ? C.green : C.line}`, background: kind === k ? C.greenSoft : "#fff", borderRadius: 12, padding: "10px 12px", cursor: "pointer", font: "inherit", color: "inherit" }}><div style={{ fontWeight: 800, fontSize: 14 }}>{t}</div><div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{d}</div></button>)}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>מסלול</div>
      <PlanCompare selected={plan} onSelect={setPlan} current={sp && sp.sub && planOf(sp.sub.plan).id} />
      {kind === "paid" && <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: C.blue, background: C.blueSoft, borderRadius: 10, padding: "9px 12px" }}><CreditCard size={16} /> התשלום באשראי בלבד · הכרטיס נשמר לחיוב חודשי אוטומטי</div>}
      <div style={{ fontSize: 12.5, color: C.sub, background: "#F7F9FC", borderRadius: 10, padding: "8px 12px", marginTop: 14, lineHeight: 1.6 }}>{kind === "trial" ? "הספק יקבל גישה מלאה למסלול " + planOf(plan).name + " עד " + ends + ". בשבוע האחרון הוא יקבל תזכורות לעבור לתשלום; אם לא ישלם — הגישה תיחסם עד שישלם." : "בלחיצה ייפתח טופס אשראי. אחרי חיוב מוצלח המנוי יופעל, והכרטיס יחויב אוטומטית כל חודש עד לביטול."}</div>
      <SubmitBtn onClick={save}>{kind === "trial" ? "פתח חודש ניסיון" : "המשך לחיוב באשראי · " + planPriceText(planOf(plan))}</SubmitBtn>
    </Modal>
  );
}
// ביטול מנוי ע"י מנהל-על — עם סיבה (בקשה באפליקציה / פנייה טלפונית / החלטת הנהלה)
function CancelSubModal({ sp, onClose, onConfirm }) {
  const req = sp.sub && sp.sub.cancelRequested;
  const reasons = ["הספק ביקש דרך האפליקציה", "הספק פנה אלינו בטלפון", "הספק פנה אלינו במייל / וואטסאפ", "אי-תשלום", "החלטת הנהלה", "אחר"];
  const [reason, setReason] = useState(req ? reasons[0] : reasons[1]); const [note, setNote] = useState(""); const [sure, setSure] = useState(false);
  const ss = subState(sp.sub);
  return (
    <Modal onClose={onClose} title={"ביטול מנוי · " + sp.name}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}><Badge tone={ss.tone}>{ss.label}</Badge><Badge tone={planOf(sp.sub && sp.sub.plan).id === "premium" ? "plum" : "blue"}>{planOf(sp.sub && sp.sub.plan).name}</Badge>{req && <Badge tone="red">🔔 ביקש ביטול ב-{new Date(req).toLocaleDateString("he-IL")}</Badge>}</div>
      <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>סיבת הביטול</div><select value={reason} onChange={(e) => setReason(e.target.value)} style={fieldStyle}>{reasons.map((r) => <option key={r} value={r}>{r}</option>)}</select></label>
      <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>הערה (לא חובה)</div><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="למשל: דיבר עם דני, סוגר את העסק" style={{ ...fieldStyle, resize: "vertical" }} /></label>
      <div style={{ fontSize: 13, color: C.red, background: C.redSoft, borderRadius: 10, padding: "9px 12px", lineHeight: 1.6 }}>אחרי הביטול הספק לא יחויב יותר והגישה שלו לאפליקציה תיחסם. הנתונים שלו נשמרים, ואפשר לחדש לו מנוי בכל רגע.</div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, margin: "12px 0 4px", cursor: "pointer" }}><input type="checkbox" checked={sure} onChange={(e) => setSure(e.target.checked)} /> אני מאשר/ת את ביטול המנוי של {sp.name}</label>
      <button onClick={() => sure && onConfirm(sp, reason, note.trim())} disabled={!sure} style={{ width: "100%", marginTop: 10, padding: 13, borderRadius: 12, border: "none", background: sure ? C.red : "#E6C3C3", color: "#fff", fontWeight: 800, fontSize: 15, cursor: sure ? "pointer" : "default" }}>בטל מנוי</button>
    </Modal>
  );
}
function BillingCenter({ state, setState, agentMode, byName }) {
  const sups = state.suppliers.filter((x) => x.id.indexOf("demo") !== 0);
  const setSub = (sid, patch) => setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sid ? { ...s2, sub: { ...(s2.sub || { plan: "basic", status: "trial", method: "none", invoices: [] }), ...patch } } : s2) }));
  const monthKeyNow = new Date().toISOString().slice(0, 7);
  const chargeOne = (sp) => {
    const sub = sp.sub || {}; const plan = planOf(sub.plan); const net = plan.price; const vat = net * BILL_VAT; const gross = net + vat;
    const inv = { id: "SV" + Date.now() + "-" + sp.id, month: monthKeyNow, plan: plan.id, planName: plan.name, net, vat, gross, method: sub.method || "none", ts: Date.now(), paid: sub.method === "credit" && !!sub.last4 };
    setSub(sp.id, { invoices: [inv, ...((sub.invoices) || [])], lastCharge: Date.now() });
    return inv;
  };
  const chargeAll = () => { const due = sups.filter((sp) => (sp.sub && sp.sub.status === "active") && !(sp.sub.invoices || []).some((iv) => iv.month === monthKeyNow)); due.forEach(chargeOne); alert(due.length ? "בוצע חיוב חודשי ל-" + due.length + " ספקים." : "כל הספקים הפעילים כבר חויבו החודש."); };
  const totalMonth = sups.reduce((sum, sp) => sum + ((sp.sub && sp.sub.invoices) || []).filter((iv) => iv.month === monthKeyNow).reduce((a, iv) => a + iv.gross, 0), 0);
  const activeCount = sups.filter((sp) => sp.sub && sp.sub.status === "active").length;
  const [openSup, setOpenSup] = useState(null); const [previewInv, setPreviewInv] = useState(null); const [chargeFor, setChargeFor] = useState(null); const [chargePlan, setChargePlan] = useState(null);
  const [addSub, setAddSub] = useState(null); const [flt, setFlt] = useState("all"); const [q, setQ] = useState(""); const [cancelFor, setCancelFor] = useState(null); const [incomeOpen, setIncomeOpen] = useState(false);
  const digits = (x) => String(x || "").replace(/\D/g, "");
  // חיפוש: שם, שם משתמש/אימייל, טלפון, ח.פ, איש קשר, אזור
  const matchQ = (sp) => { const t = q.trim().toLowerCase(); if (!t) return true; const o = sp.owner || {}, b = sp.biz || {}; const hay = [sp.name, sp.category, sp.regions, o.email, o.contact, o.phone, b.email, b.phone, b.taxId, b.address].join(" ").toLowerCase(); if (hay.includes(t)) return true; const d = digits(t); return d.length >= 3 && [o.phone, b.phone, b.taxId].some((x) => digits(x).includes(d)); };
  const putSub = (sid, sub) => setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sid ? { ...s2, sub } : s2) }));
  const cancelSub = (sp) => setCancelFor(sp);
  const doCancel = (sp, reason, note) => { setSub(sp.id, { status: "canceled", canceledAt: Date.now(), cancelRequested: null, cancelReason: reason, cancelNote: note || "", canceledBy: byName || "מנהל-על" }); setCancelFor(null); };
  const counts = { trial: 0, active: 0, req: 0, off: 0 }; sups.forEach((x) => { const st = subState(x.sub).st; if (st === "trial") counts.trial++; else if (st === "active") counts.active++; else counts.off++; if (x.sub && x.sub.cancelRequested && st !== "canceled") counts.req++; });
  const shown = sups.filter((x) => { const st = subState(x.sub).st; return flt === "all" || (flt === "trial" && st === "trial") || (flt === "active" && st === "active") || (flt === "req" && x.sub && x.sub.cancelRequested && st !== "canceled") || (flt === "off" && (st === "expired" || st === "canceled" || st === "none")); }).filter(matchQ).sort((a, b) => (b.sub && b.sub.cancelRequested ? 1 : 0) - (a.sub && a.sub.cancelRequested ? 1 : 0));
  const recordCharge = (sp, inv, saveCard) => setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sp.id ? { ...s2, sub: applyCharge(s2.sub, inv, saveCard) } : s2) }));
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <Kpi icon={<Users size={17} />} label="מנויים משלמים" value={counts.active} tone="green" onClick={() => { setFlt("active"); setQ(""); scrollToId("bill-list"); }} active={flt === "active"} hint="הצג משלמים" />
        <Kpi icon={<Gift size={17} />} label="בחודש ניסיון" value={counts.trial} tone="amber" onClick={() => { setFlt("trial"); setQ(""); scrollToId("bill-list"); }} active={flt === "trial"} hint="הצג בניסיון" />
        <Kpi icon={<Wallet size={17} />} label="הכנסות החודש" value={NIS(totalMonth)} tone="blue" onClick={() => setIncomeOpen(true)} hint="פירוט חיובי החודש" />
        <Kpi icon={<Building2 size={17} />} label={'סה"כ ספקים'} value={sups.length} tone="plum" onClick={() => { setFlt("all"); setQ(""); scrollToId("bill-list"); }} active={flt === "all" && !q} hint="הצג את כולם" />
        {counts.req > 0 && <Kpi icon={<Bell size={17} />} label="ביקשו ביטול" value={counts.req} tone="red" onClick={() => { setFlt("req"); setQ(""); scrollToId("bill-list"); }} active={flt === "req"} hint="לטיפול" />}
      </div>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Wallet size={18} />} extra={<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{!agentMode && <button onClick={() => setAddSub({})} style={{ border: "none", background: C.plum, color: "#fff", fontWeight: 800, fontSize: 13, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Plus size={15} /> הוסף מנוי</button>}<button onClick={() => setChargeFor("pick")} style={{ border: `1px solid ${C.green}`, background: "#fff", color: C.greenDeep, fontWeight: 800, fontSize: 13, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><CreditCard size={15} /> חיוב חדש באשראי</button>{!agentMode && <button onClick={chargeAll} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 13, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><CreditCard size={15} /> חיוב חודשי לכל הפעילים</button>}</div>}>מנויי הספקים</SectionTitle>
        <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 12, background: C.amberSoft, borderRadius: 10, padding: "8px 12px", lineHeight: 1.6 }}>💳 "חיוב באשראי" פותח טופס סליקה: מזינים כרטיס, סכום ותיאור, והמערכת מפיקה חשבונית מס/קבלה. כרגע הסליקה פועלת במצב הדגמה (לא יורד כסף אמיתי) — להפעלה אמיתית מחברים חברת סליקה (טרנזילה / קארדקום / PayPlus). המערכת לעולם לא שומרת מספר כרטיס מלא או CVV — רק 4 ספרות אחרונות.</div>
        <div id="bill-list" style={{ display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${q ? C.green : C.line}`, borderRadius: 12, padding: "0 12px", marginBottom: 10, background: "#fff", scrollMarginTop: 90 }}><Search size={17} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש ספק: שם, שם משתמש / אימייל, טלפון, ח.פ, איש קשר…" style={{ border: "none", outline: "none", padding: "12px 4px", fontSize: 14, width: "100%", fontFamily: "inherit", background: "transparent" }} />{q && <button onClick={() => setQ("")} style={{ border: "none", background: "transparent", color: C.sub, cursor: "pointer", display: "flex" }}><X size={16} /></button>}</div>
        {q && <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 8 }}>נמצאו {shown.length} ספקים</div>}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{[["all", "הכל · " + sups.length], ["trial", "בניסיון · " + counts.trial], ["active", "משלמים · " + counts.active], ["req", "🔔 ביקשו ביטול · " + counts.req], ["off", "פג / מבוטל · " + counts.off]].map(([k, l]) => <button key={k} onClick={() => setFlt(k)} style={{ border: `1px solid ${flt === k ? (k === "req" ? C.red : C.green) : C.line}`, background: flt === k ? (k === "req" ? C.red : C.green) : "#fff", color: flt === k ? "#fff" : (k === "req" && counts.req ? C.red : C.sub), borderRadius: 20, padding: "6px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{l}</button>)}</div>
        <div style={{ display: "grid", gap: 8 }}>
          {shown.map((sp) => { const sub = sp.sub || { plan: "basic", status: "trial", method: "none", invoices: [] }; const ss = subState(sp.sub); const plan = planOf(sub.plan); const chargedThisMonth = (sub.invoices || []).some((iv) => iv.month === monthKeyNow); const stTone = ss.tone; const stLbl = ss.label; return (
            <div key={sp.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <Logo size={34} img={sp.brand && sp.brand.logo} name={sp.name} />
                <div style={{ flex: 1, minWidth: 140 }}><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{[sp.owner && sp.owner.contact, sp.owner && sp.owner.email, (sp.owner && sp.owner.phone) || (sp.biz && sp.biz.phone), sp.biz && sp.biz.taxId ? "ח.פ " + sp.biz.taxId : ""].filter(Boolean).join(" · ")}</div></div>
                <Badge tone={stTone}>{stLbl}</Badge>
                <Badge tone={plan.id === "premium" ? "plum" : "blue"}>{plan.name} · {NIS(plan.price)}/חודש</Badge>
                {sub.cancelRequested && ss.st !== "canceled" && <Badge tone="red">🔔 ביקש ביטול · {new Date(sub.cancelRequested).toLocaleDateString("he-IL")}</Badge>}
                {ss.st === "canceled" && sub.canceledAt && <Badge>בוטל {new Date(sub.canceledAt).toLocaleDateString("he-IL")}{sub.cancelReason ? " · " + sub.cancelReason : ""}</Badge>}
                {sub.method === "credit" && <Badge><CreditCard size={11} /> אשראי{sub.last4 ? " ••" + sub.last4 : ""}</Badge>}
                {ss.st === "active" && !(sub.method === "credit" && sub.last4) && <Badge tone="red"><CreditCard size={11} /> אין כרטיס אשראי שמור</Badge>}
                {chargedThisMonth && <Badge tone="green"><Check size={11} /> חויב החודש</Badge>}
              </div>
              {!agentMode && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: C.sub }}>מסלול:</span>
                {Object.values(PLANS).map((pl) => <button key={pl.id} onClick={() => setSub(sp.id, { plan: pl.id })} style={{ border: `1px solid ${sub.plan === pl.id ? C.green : C.line}`, background: sub.plan === pl.id ? C.greenSoft : "#fff", color: sub.plan === pl.id ? C.greenDeep : C.sub, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{pl.name}</button>)}
                
              </div>}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                <button onClick={() => setChargeFor(sp)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><CreditCard size={13} /> חיוב באשראי</button>
                {!agentMode && ss.st === "trial" && <button onClick={() => setSub(sp.id, { trialEnds: (ss.ends || Date.now()) + TRIAL_DAYS * DAY_MS })} style={{ border: `1px solid ${C.amber}`, background: "#fff", color: "#7A5A17", fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: "pointer" }}>הארך ניסיון בחודש</button>}
                {!agentMode && (ss.st === "expired" || ss.st === "canceled" || ss.st === "none") && <button onClick={() => setAddSub({ preset: sp })} style={{ border: "none", background: C.plum, color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: "pointer" }}>חדש מנוי</button>}
                {!agentMode && (ss.st === "trial" || ss.st === "active") && <button onClick={() => cancelSub(sp)} style={{ border: `1px solid ${C.red}`, background: sub.cancelRequested ? C.red : "#fff", color: sub.cancelRequested ? "#fff" : C.red, fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: "pointer" }}>{sub.cancelRequested ? "אשר ביטול מנוי" : "בטל מנוי"}</button>}
                {!agentMode && <button onClick={() => { if (chargedThisMonth) { alert("ספק זה כבר חויב החודש."); return; } chargeOne(sp); }} disabled={sub.status !== "active"} style={{ border: "none", background: sub.status === "active" ? C.greenDeep : "#C9D3C7", color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: sub.status === "active" ? "pointer" : "default", display: "flex", alignItems: "center", gap: 5 }}><CreditCard size={13} /> רישום חיוב חודשי</button>}
                <button onClick={() => setOpenSup(openSup === sp.id ? null : sp.id)} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 12.5, padding: "7px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Receipt size={13} /> חשבוניות ({(sub.invoices || []).length})</button>
              </div>
              {openSup === sp.id && <div style={{ marginTop: 10, borderTop: `1px dashed ${C.line}`, paddingTop: 10, display: "grid", gap: 6 }}>{(sub.invoices || []).length === 0 ? <span style={{ fontSize: 12.5, color: C.sub }}>אין חשבוניות עדיין</span> : (sub.invoices || []).map((iv) => <div key={iv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, gap: 8, flexWrap: "wrap" }}><span>{iv.month} · {iv.desc || iv.planName} · {NIS(iv.gross)} {iv.paid ? "" : "(לא שולם)"}{iv.last4 ? " · 💳 ••" + iv.last4 : ""}{iv.chargedBy ? " · " + iv.chargedBy : ""}</span><button onClick={() => setPreviewInv({ iv, sp })} style={{ border: `1px solid ${C.green}`, background: "#fff", color: C.greenDeep, fontWeight: 700, fontSize: 12, padding: "4px 10px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Receipt size={12} /> צפייה</button></div>)}</div>}
            </div>
          ); })}
          {shown.length === 0 && <Empty>{sups.length ? "אין ספקים בסינון הזה" : "אין ספקים עדיין"}</Empty>}
        </div>
      </Panel>
      {previewInv && <SubInvoiceModal iv={previewInv.iv} sp={previewInv.sp} onClose={() => setPreviewInv(null)} />}
      {incomeOpen && (() => { const rows = sups.flatMap((sp) => ((sp.sub && sp.sub.invoices) || []).filter((iv) => iv.month === monthKeyNow).map((iv) => ({ sp, iv }))).sort((a, b) => b.iv.ts - a.iv.ts); return (
        <Modal onClose={() => setIncomeOpen(false)} title={"הכנסות מנויים · " + new Date().toLocaleDateString("he-IL", { month: "long", year: "numeric" })}>
          {rows.length === 0 ? <Empty>עדיין אין חיובים החודש</Empty> : <div style={{ display: "grid", gap: 8, maxHeight: 420, overflow: "auto" }}>{rows.map(({ sp, iv }) => (
            <button key={iv.id} className="tp-click" onClick={() => { setIncomeOpen(false); setPreviewInv({ iv, sp }); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, font: "inherit", color: "inherit" }}>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{iv.desc || ("מסלול " + iv.planName)} · {new Date(iv.ts).toLocaleDateString("he-IL")}{iv.last4 ? " · ••" + iv.last4 : ""}</div></div>
              {iv.paid ? <Badge tone="green"><Check size={11} /> שולם</Badge> : <Badge tone="amber">ממתין</Badge>}
              <b style={{ color: C.greenDeep }}>{NIS(iv.gross)}</b><ChevronLeft size={16} color={C.sub} />
            </button>))}</div>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `2px solid ${C.greenDeep}`, fontWeight: 800, fontSize: 16 }}><span>סה"כ {rows.length} חיובים</span><span style={{ color: C.greenDeep }}>{NIS(totalMonth)}</span></div>
        </Modal>); })()}
      {cancelFor && <CancelSubModal sp={cancelFor} onClose={() => setCancelFor(null)} onConfirm={doCancel} />}
      {addSub && <AddSubModal sups={sups} preset={addSub.preset} onClose={() => setAddSub(null)} onSave={(sp, sub) => { putSub(sp.id, sub); setAddSub(null); }} onChargeCard={(sp, plan) => { setAddSub(null); setChargePlan(plan); setChargeFor(sp); }} />}
      {chargeFor && <CardChargeModal sups={sups} sp={chargeFor === "pick" ? null : chargeFor} planId={chargePlan} byName={byName || "מנהל-על"} onClose={() => { setChargeFor(null); setChargePlan(null); }} onCharged={(sp, inv, saveCard) => { recordCharge(sp, inv, saveCard); }} onPreview={(sp, inv) => { setChargeFor(null); setPreviewInv({ iv: inv, sp }); }} />}
    </div>
  );
}
// רישום חיוב על המנוי. חיוב מנוי מפעיל את המנוי (גם מניסיון / מבוטל) במסלול שנבחר
const applyCharge = (sub0, inv, saveCard) => { const sub = sub0 || { plan: "basic", status: "trial", method: "none", invoices: [] }; return { ...sub, invoices: [inv, ...(sub.invoices || [])], lastCharge: Date.now(), ...(saveCard ? { method: "credit", last4: inv.last4, cardBrand: inv.cardBrand, cardExp: inv.cardExp } : {}), ...(inv.kind === "sub" ? { plan: inv.plan || sub.plan, ...(sub.status !== "active" ? { status: "active", since: Date.now(), trialEnds: null, canceledAt: null, cancelRequested: null } : {}) } : {}) }; };
const luhnOk = (num) => { const d = num.replace(/\D/g, ""); if (d.length < 12 || d.length > 19) return false; let sum = 0, alt = false; for (let i = d.length - 1; i >= 0; i--) { let n = +d[i]; if (alt) { n *= 2; if (n > 9) n -= 9; } sum += n; alt = !alt; } return sum % 10 === 0; };
const cardBrandOf = (num) => { const d = num.replace(/\D/g, ""); if (/^4/.test(d)) return "Visa"; if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard"; if (/^3[47]/.test(d)) return "Amex"; if (/^36|^30[0-5]|^38/.test(d)) return "Diners"; if (/^(3088|3096|3112|3158|3337|35)/.test(d)) return "JCB"; return "ישראכרט / אחר"; };
function CardChargeModal({ sups, sp: fixedSp, byName, onClose, onCharged, onPreview, planId, self }) {
  const [spId, setSpId] = useState(fixedSp ? fixedSp.id : (sups[0] ? sups[0].id : ""));
  const sp = sups.find((x) => x.id === spId) || fixedSp;
  const [pl, setPl] = useState(planId ? planOf(planId).id : planOf(sp && sp.sub && sp.sub.plan).id);
  useEffect(() => { if (!planId && sp) setPl(planOf(sp.sub && sp.sub.plan).id); }, [spId]);
  const plan = planOf(pl);
  const [c, setC] = useState({ num: "", exp: "", cvv: "", holder: "", idNum: "" });
  const [touched, setTouched] = useState({}); const [tried, setTried] = useState(false);
  const [agreeOk, setAgreeOk] = useState(false);
  const [err, setErr] = useState(""); const [stage, setStage] = useState("form"); const [result, setResult] = useState(null);
  const net = plan.price; const vat = net * BILL_VAT; const gross = net + vat;
  const fmtNum = (v) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
  // כל השדות חובה — בדיקה לכל שדה בנפרד
  const expErr = () => { if (!c.exp) return "חובה למלא תוקף"; const m = c.exp.match(/^(\d{2})\/(\d{2})$/); if (!m) return "תוקף בפורמט MM/YY"; const mm = +m[1], yy = 2000 + +m[2]; if (mm < 1 || mm > 12) return "חודש לא תקין"; if (new Date(yy, mm, 1).getTime() <= Date.now()) return "תוקף הכרטיס פג"; return ""; };
  const errs = {
    num: !c.num ? "חובה למלא מספר כרטיס" : !luhnOk(c.num) ? "מספר כרטיס לא תקין" : "",
    exp: expErr(),
    cvv: !c.cvv ? "חובה למלא CVV" : !/^\d{3,4}$/.test(c.cvv) ? "3–4 ספרות" : "",
    holder: !c.holder.trim() ? "חובה למלא שם בעל הכרטיס" : c.holder.trim().length < 2 ? "שם קצר מדי" : "",
    idNum: !c.idNum ? "חובה למלא ת.ז / ח.פ" : !/^\d{5,9}$/.test(c.idNum) ? "מספר לא תקין" : "",
  };
  const allOk = !Object.values(errs).some(Boolean) && agreeOk && !!sp;
  const show = (k) => (touched[k] || tried) && errs[k];
  const submit = () => {
    setErr(""); setTried(true);
    if (!sp) return setErr("בחר ספק לחיוב");
    if (Object.values(errs).some(Boolean)) return setErr("יש למלא את כל פרטי הכרטיס המסומנים באדום");
    if (!agreeOk) return setErr(self ? "יש לאשר את החיוב החודשי" : "יש לאשר שבעל הכרטיס הסכים לחיוב");
    setStage("busy");
    setTimeout(() => {
      const d = c.num.replace(/\D/g, ""); const last4 = d.slice(-4); const brand = cardBrandOf(d);
      const approval = String(Math.floor(1000000 + Math.random() * 9000000));
      const inv = { id: "SV" + Date.now() + "-" + sp.id, month: new Date().toISOString().slice(0, 7), kind: "sub", plan: plan.id, planName: plan.name, desc: "מנוי B2B+ — מסלול " + plan.name, net, vat, gross, method: "credit", last4, cardBrand: brand, cardExp: c.exp, approval, installments: 1, holder: c.holder.trim(), chargedBy: byName, ts: Date.now(), paid: true, demo: true };
      onCharged(sp, inv, true); // הכרטיס נשמר (4 ספרות אחרונות) לחיוב החודשי
      setC({ num: "", exp: "", cvv: "", holder: "", idNum: "" }); // לא משאירים פרטי כרטיס בזיכרון
      setResult({ inv, sp }); setStage("done");
    }, 1300);
  };
  const CardField = ({ k, label, ...p }) => (
    <label style={{ display: "block", marginBottom: 10 }}>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{label} <span style={{ color: C.red }}>*</span></div>
      <input {...p} onBlur={() => setTouched((t) => ({ ...t, [k]: true }))} style={{ ...fieldStyle, padding: "10px 11px", borderColor: show(k) ? C.red : (c[k] && !errs[k] ? C.green : undefined), background: show(k) ? "#FFF7F7" : "#fff" }} />
      {show(k) && <div style={{ fontSize: 11.5, color: C.red, marginTop: 3, fontWeight: 600 }}>{errs[k]}</div>}
    </label>
  );
  if (stage === "done" && result) return (
    <Modal onClose={onClose} title="החיוב בוצע">
      <div style={{ textAlign: "center", padding: "6px 0 12px" }}>
        <div style={{ width: 58, height: 58, borderRadius: "50%", background: C.greenSoft, color: C.greenDeep, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}><Check size={30} /></div>
        <div style={{ fontWeight: 800, fontSize: 22, color: C.greenDeep }}>{NIS(result.inv.gross)}</div>
        <div style={{ fontSize: 13.5, color: C.sub, marginTop: 4, lineHeight: 1.7 }}>{result.sp.name} · {result.inv.desc}<br />{result.inv.cardBrand} ••{result.inv.last4} · אישור {result.inv.approval}<br />הכרטיס יחויב אוטומטית כל חודש עד לביטול</div>
        <div style={{ fontSize: 12, color: C.amber, marginTop: 8 }}>מצב הדגמה — לא בוצע חיוב אמיתי</div>
      </div>
      <SubmitBtn onClick={() => onPreview(result.sp, result.inv)}>צפייה בחשבונית</SubmitBtn>
      <button onClick={onClose} style={{ width: "100%", marginTop: 8, border: "none", background: "transparent", color: C.sub, fontWeight: 700, cursor: "pointer", padding: 8 }}>סגור</button>
    </Modal>
  );
  return (
    <Modal onClose={stage === "busy" ? () => {} : onClose} title={self ? "תשלום מנוי · מסלול " + plan.name : "חיוב מנוי באשראי"}>
      {!fixedSp && <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>ספק לחיוב <span style={{ color: C.red }}>*</span></div><select value={spId} onChange={(e) => setSpId(e.target.value)} style={fieldStyle}>{sups.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>}
      {fixedSp && <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><Logo size={34} img={fixedSp.brand && fixedSp.brand.logo} name={fixedSp.name} /><div style={{ fontWeight: 800 }}>{fixedSp.name}</div></div>}
      {!self && !planId && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>{Object.values(PLANS).map((x) => <button key={x.id} onClick={() => setPl(x.id)} style={{ border: `1.5px solid ${pl === x.id ? C.green : C.line}`, background: pl === x.id ? C.greenSoft : "#fff", color: pl === x.id ? C.greenDeep : C.sub, borderRadius: 10, padding: "9px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>{x.name} · {NIS(x.price)}</button>)}</div>}
      <div style={{ background: "#F7F9FC", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}><span>מנוי חודשי · מסלול <b>{plan.name}</b></span><span>{NIS(net)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: C.sub }}><span>מע"מ {Math.round(BILL_VAT * 100)}%</span><span>{NIS(vat)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0 2px", marginTop: 4, borderTop: `2px solid ${C.greenDeep}`, fontWeight: 800, fontSize: 16 }}><span>סה"כ לחיוב</span><span style={{ color: C.greenDeep }}>{NIS(gross)}</span></div>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>מתחדש אוטומטית כל חודש עד לביטול</div>
      </div>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, background: "linear-gradient(135deg,#F8FAFD,#fff)" }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Lock size={15} color={C.greenDeep} /> פרטי כרטיס אשראי {c.num.replace(/\D/g, "").length >= 2 && <Badge>{cardBrandOf(c.num)}</Badge>}</div>
        {CardField({ k: "num", label: "מספר כרטיס", value: c.num, onChange: (e) => setC({ ...c, num: fmtNum(e.target.value) }), inputMode: "numeric", autoComplete: "cc-number", placeholder: "0000 0000 0000 0000", dir: "ltr" })}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {CardField({ k: "exp", label: "תוקף", value: c.exp, onChange: (e) => setC({ ...c, exp: fmtExp(e.target.value) }), placeholder: "MM/YY", inputMode: "numeric", autoComplete: "cc-exp", dir: "ltr" })}
          {CardField({ k: "cvv", label: "CVV", type: "password", value: c.cvv, onChange: (e) => setC({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }), inputMode: "numeric", autoComplete: "cc-csc", dir: "ltr", placeholder: "123" })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {CardField({ k: "holder", label: "שם בעל הכרטיס", value: c.holder, onChange: (e) => setC({ ...c, holder: e.target.value }), autoComplete: "cc-name" })}
          {CardField({ k: "idNum", label: "ת.ז / ח.פ בעל הכרטיס", value: c.idNum, onChange: (e) => setC({ ...c, idNum: e.target.value.replace(/\D/g, "").slice(0, 9) }), inputMode: "numeric", dir: "ltr" })}
        </div>
        <div style={{ fontSize: 12, color: C.sub }}>🔒 הכרטיס יישמר לחיוב החודשי — נשמרות רק 4 הספרות האחרונות</div>
      </div>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: tried && !agreeOk ? C.red : C.ink, margin: "12px 0 0", cursor: "pointer" }}><input type="checkbox" checked={agreeOk} onChange={(e) => setAgreeOk(e.target.checked)} style={{ marginTop: 2 }} /> <span>{self ? "אני מאשר/ת חיוב חודשי חוזר של " + NIS(gross) + " בכרטיס זה עד לביטול המנוי, בהתאם לתקנון." : "אני מאשר/ת שבעל הכרטיס נתן הסכמה מפורשת לחיוב זה ולחיוב חודשי חוזר עד לביטול."} <span style={{ color: C.red }}>*</span></span></label>
      {err && <ErrBox>{err}</ErrBox>}
      <button onClick={submit} disabled={stage === "busy"} style={{ width: "100%", marginTop: 12, padding: 13, borderRadius: 12, border: "none", background: allOk ? C.green : "#A9C7B5", color: "#fff", fontWeight: 800, fontSize: 15, cursor: stage === "busy" ? "default" : "pointer", opacity: stage === "busy" ? .7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><CreditCard size={17} /> {stage === "busy" ? "מעבד חיוב…" : (self ? "שלם " : "חייב ") + NIS(gross) + " (" + NIS(net) + ' + מע"מ)'}</button>
      {!allOk && stage === "form" && <div style={{ fontSize: 11.5, color: C.sub, textAlign: "center", marginTop: 6 }}>יש למלא את כל השדות המסומנים ב-<span style={{ color: C.red }}>*</span></div>}
      <div style={{ fontSize: 11.5, color: C.sub, textAlign: "center", marginTop: 8 }}>מצב הדגמה · בחיבור לחברת סליקה אמיתית פרטי הכרטיס יוזנו בדף מאובטח של חברת הסליקה (PCI-DSS)</div>
    </Modal>
  );
}
function SubInvoiceModal({ iv, sp, onClose }) {
  const color = "#0B2A63";
  return (
    <Modal onClose={onClose} title="חשבונית מנוי">
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 18, background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `2px solid ${color}`, paddingBottom: 12, marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Logo size={40} img={LOGO_IMG} name="B2B+" />
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>B2B+ Marketplace</div>
              <div>ממשק הזמנות מהספק לעסק</div>
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color }}>חשבונית מס / קבלה</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>מס' {iv.id}<br />{new Date(iv.ts).toLocaleDateString("he-IL")}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, marginBottom: 10 }}><span style={{ color: C.sub }}>לכבוד:</span> <b>{sp.name}</b>{sp.biz && sp.biz.taxId ? " · ע.מ/ח.פ " + sp.biz.taxId : ""}<div style={{ fontSize: 12.5, color: C.sub, marginTop: 2 }}>{sp.owner ? sp.owner.email : ""}</div></div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ background: color, color: "#fff", textAlign: "right" }}><Th>תיאור</Th><Th>חודש</Th><Th>סכום</Th></tr></thead>
          <tbody><tr style={{ borderBottom: `1px solid ${C.line}` }}><Td>{iv.desc || ("מנוי B2B+ — מסלול " + iv.planName)}</Td><Td>{iv.month}</Td><Td strong>{NIS(iv.net)}</Td></tr></tbody>
        </table>
        <div style={{ marginInlineStart: "auto", maxWidth: 280, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>סכום לפני מע"מ</span><span style={{ fontWeight: 700 }}>{NIS(iv.net)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>מע"מ 18%</span><span style={{ fontWeight: 700 }}>{NIS(iv.vat)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `2px solid ${color}`, fontWeight: 800, fontSize: 18 }}><span>סה"כ לתשלום</span><span style={{ color }}>{NIS(iv.gross)}</span></div>
        </div>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10 }}>{iv.paid ? "שולם ב" + (iv.method === "credit" ? "אשראי" + (iv.last4 ? " " + (iv.cardBrand || "") + " ••" + iv.last4 : "") + (iv.installments > 1 ? " · " + iv.installments + " תשלומים" : "") + (iv.approval ? " · אישור " + iv.approval : "") : iv.method === "standing" ? "הוראת קבע" : "") : "ממתין לתשלום"} · מופק ע"י B2B+ Marketplace</div>
      </div>
      <button onClick={() => downloadSubInvoice(iv, sp, {})} style={{ width: "100%", marginTop: 14, padding: 11, borderRadius: 12, border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Download size={16} /> הורדת חשבונית (להדפסה / PDF)</button>
    </Modal>
  );
}
function downloadSubInvoice(iv, sp, state) {
  const color = "#0B2A63";
  const html = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>חשבונית ${iv.id}</title><style>body{font-family:system-ui,Arial;padding:32px;color:#182620}h1{color:${color};margin:0}table{width:100%;border-collapse:collapse;margin-top:16px}td,th{border-bottom:1px solid #E4E9DE;padding:8px;text-align:right}thead tr{background:${color};color:#fff}.tot{margin-top:16px;text-align:left;line-height:1.8}.tot b{font-size:20px;color:${color}}.hd{display:flex;justify-content:space-between;border-bottom:3px solid ${color};padding-bottom:10px}</style></head><body><div class="hd"><div><h1>B2B+ Marketplace</h1><div style="color:#5B6B60;font-size:13px">ממשק הזמנות מהספק לעסק<br>ע.מ/ח.פ: 000000000</div></div><div style="text-align:left"><div style="font-weight:800;color:${color};font-size:18px">חשבונית מס / קבלה</div><div style="color:#5B6B60;font-size:13px">מס' ${iv.id}<br>${new Date(iv.ts).toLocaleDateString("he-IL")}</div></div></div><div style="margin-top:12px">לכבוד: <b>${sp.name}</b>${sp.biz && sp.biz.taxId ? " · ע.מ/ח.פ " + sp.biz.taxId : ""}<br>${sp.owner ? sp.owner.email : ""}</div><table><thead><tr><th>תיאור</th><th>חודש</th><th>סכום</th></tr></thead><tbody><tr><td>${iv.desc || ("מנוי B2B+ — מסלול " + iv.planName)}</td><td>${iv.month}</td><td>${NIS(iv.net)}</td></tr></tbody></table><div class="tot">סכום לפני מע"מ: ${NIS(iv.net)}<br>מע"מ 18%: ${NIS(iv.vat)}<br><b>סה"כ לתשלום: ${NIS(iv.gross)}</b></div><p style="color:#5B6B60;font-size:12px">${iv.paid ? "שולם ב" + (iv.method === "credit" ? "אשראי" + (iv.last4 ? " ••" + iv.last4 : "") + (iv.approval ? " · אישור " + iv.approval : "") : iv.method === "standing" ? "הוראת קבע" : "") : "ממתין לתשלום"} · מופק ע"י B2B+ Marketplace</p></body></html>`;
  try { const blob = new Blob([html], { type: "text/html;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "b2b-invoice-" + iv.id + ".html"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (e) {}
}
function SuperAdminView({ state, setState, onEnter, onEnterAs, agentMode }) {
  const [saTab, setSaTab] = useState("main");
  const [add, setAdd] = useState(false); const [sf, setSf] = useState({ name: "", email: "", password: "" }); const [saErr, setSaErr] = useState("");
  const addAgent = () => { if (!sf.name || !sf.email || !sf.password) return setSaErr("שם, אימייל וסיסמה חובה"); if ((state.superAgents || []).some((a) => a.email.trim().toLowerCase() === sf.email.trim().toLowerCase())) return setSaErr("אימייל כבר קיים"); setState((r) => ({ ...r, superAgents: [...(r.superAgents || []), { id: "sa" + Date.now(), role: "superagent", ...sf }] })); setSf({ name: "", email: "", password: "" }); setSaErr(""); };
  const delAgent = (id) => setState((r) => ({ ...r, superAgents: (r.superAgents || []).filter((a) => a.id !== id) }));
  const demoSup = (state.suppliers || []).find((x) => x.id.indexOf("demo") === 0);
  const createDemo = (kind) => setState((r) => ({ ...r, suppliers: [...r.suppliers.filter((x) => x.id.indexOf("demo") !== 0), demoSupplier(kind)] }));
  const resetDemo = () => setState((r) => ({ ...r, suppliers: r.suppliers.filter((x) => x.id.indexOf("demo") !== 0) }));
  const enterRole = (role) => { if (!demoSup || !onEnterAs) return; if (role === "supplier") return onEnterAs({ kind: "supplier", supplierId: demoSup.id }); if (role === "client") { const cl = demoSup.clients.find((c) => c.status === "active"); if (cl) onEnterAs({ kind: "client", supplierId: demoSup.id, email: cl.email }); return; } const st = demoSup.staff.find((x) => x.role === role); if (st) onEnterAs({ kind: role, supplierId: demoSup.id, userId: st.id }); };
  const suppliers = state.suppliers;
  const pending = suppliers.filter((x) => x.status === "pending");
  const active = suppliers.filter((x) => x.status === "active");
  const totalOrders = active.reduce((n, s) => n + s.orders.length, 0);
  const totalClients = active.reduce((n, s) => n + s.clients.filter((c) => c.status === "active").length, 0);
  const totalRevenue = active.reduce((n, s) => n + s.orders.reduce((a, o) => a + orderTotal(o, s.products), 0), 0);
  const [brk, setBreak] = useState(null);
  const approve = (id) => setState((r) => ({ ...r, suppliers: r.suppliers.map((s) => s.id === id ? { ...s, status: "active", sub: (s.sub && s.sub.status === "active") ? s.sub : newTrialSub((s.sub && planOf(s.sub.plan).id) || "premium", s.sub) } : s) })); // חודש הניסיון מתחיל מרגע האישור
  const reject = (id) => setState((r) => ({ ...r, suppliers: r.suppliers.filter((s) => s.id !== id) }));
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {(
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", background: C.surface, border: `1px solid ${C.line}`, borderRadius: 14, padding: 8, boxShadow: SH }}>
          {[["main", "ספקים", Building2], ["demo", "הדגמה", Star], ["billing", "חיובים ומנויים", CreditCard]].map(([id, label, Icon]) => { const on = saTab === id; return <button key={id} onClick={() => setSaTab(id)} style={{ display: "flex", alignItems: "center", gap: 7, border: "none", background: on ? C.green : "transparent", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 14, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}><Icon size={16} />{label}</button>; })}
        </div>
      )}
      {saTab === "billing" && <BillingCenter state={state} setState={setState} agentMode={agentMode} byName={agentMode ? "סוכן-על" : "מנהל-על"} />}
      {saTab === "demo" && <DemoCenter demoSup={demoSup} createDemo={createDemo} resetDemo={resetDemo} enterRole={enterRole} />}
      {saTab === "main" && <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
        <Kpi icon={<Building2 size={18} />} label="ספקים פעילים" value={active.length} tone="green" onClick={() => scrollToId("sa-suppliers")} hint="לרשימת הספקים" />
        <Kpi icon={<Clock size={18} />} label="ממתינים לאישור" value={pending.length} tone="amber" onClick={() => pending.length ? scrollToId("sa-pending") : alert("אין ספקים שממתינים לאישור כרגע")} hint={pending.length ? "לאישור" : "אין ממתינים"} />
        <Kpi icon={<ClipboardList size={18} />} label={'סה"כ הזמנות'} value={totalOrders} tone="blue" onClick={() => setBreak("orders")} hint="לפי ספק" />
        <Kpi icon={<Wallet size={18} />} label={'סה"כ הכנסות'} value={NIS(totalRevenue)} tone="green" onClick={() => setBreak("revenue")} hint="לפי ספק" />
      </div>
      {!agentMode && <RecruitPanel state={state} setState={setState} />}
      {brk && <Modal onClose={() => setBreak(null)} title={brk === "orders" ? "הזמנות לפי ספק" : "הכנסות לפי ספק"}>
        <div style={{ display: "grid", gap: 8, maxHeight: 440, overflow: "auto" }}>{[...active].map((sp) => ({ sp, n: sp.orders.length, nw: sp.orders.filter((o) => o.status === "new").length, rev: sp.orders.reduce((a, o) => a + orderTotal(o, sp.products), 0) })).sort((a, b) => brk === "orders" ? b.n - a.n : b.rev - a.rev).map(({ sp, n, nw, rev }) => (
          <button key={sp.id} className="tp-click" onClick={() => { setBreak(null); onEnter(sp.id); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, font: "inherit", color: "inherit" }}>
            <Logo size={34} img={sp.brand && sp.brand.logo} name={sp.name} />
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{n} הזמנות{nw ? " · " + nw + " חדשות" : ""}</div></div>
            <b style={{ color: brk === "orders" ? C.blue : C.greenDeep }}>{brk === "orders" ? n : NIS(rev)}</b><ChevronLeft size={16} color={C.sub} />
          </button>))}</div>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10 }}>לחיצה על ספק נכנסת לניהול החנות שלו</div>
      </Modal>}
      {pending.length > 0 && (
        <Panel id="sa-pending" style={{ borderColor: "#E4D3A8", background: "#FFFDF6", boxShadow: SH, scrollMarginTop: 90 }}>
          <SectionTitle icon={<Clock size={18} />} extra={<Badge tone="amber">{pending.length}</Badge>}>בקשות הרשמת ספקים</SectionTitle>
          <div style={{ display: "grid", gap: 10 }}>{pending.map((sp) => (
            <div key={sp.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, background: "#fff", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 200 }}><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 13, color: C.sub }}>{sp.category} · {sp.owner.contact} · {sp.owner.email}</div></div>
              <div style={{ display: "flex", gap: 8 }}><button onClick={() => approve(sp.id)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><Check size={16} /> אשר</button><button onClick={() => reject(sp.id)} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.red, fontWeight: 700, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><X size={16} /> דחה</button></div>
            </div>
          ))}</div>
        </Panel>
      )}
      <Panel style={{ boxShadow: SH }}>
        <span id="sa-suppliers" style={{ display: "block", position: "relative", top: -90 }} />
        <SectionTitle icon={<Building2 size={18} />} extra={<button onClick={() => setAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "7px 13px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> ספק חדש</button>}>הספקים בפלטפורמה</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {active.map((sp) => { const rev = sp.orders.reduce((a, o) => a + orderTotal(o, sp.products), 0); const nw = sp.orders.filter((o) => o.status === "new").length; return (
            <div key={sp.id} className="tp-click" onClick={() => onEnter(sp.id)} title="כניסה לניהול החנות" style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, background: "#fff", boxShadow: SH, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo size={40} img={sp.brand && sp.brand.logo} name={sp.name} /><div><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{sp.category}</div></div></div>
              {sp.sub && !isDemoSup(sp) && (() => { const ss = subState(sp.sub); return (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginTop: 10, background: "#F7F9FC", borderRadius: 10, padding: "7px 9px" }}>
                  <Badge tone={ss.tone}>{ss.label}</Badge><Badge tone={planOf(sp.sub.plan).id === "premium" ? "plum" : "blue"}>{planOf(sp.sub.plan).name}</Badge>
                  {sp.sub.cancelRequested && ss.st !== "canceled" && <Badge tone="red">🔔 ביקש ביטול</Badge>}
                </div>); })()}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}><Badge>{sp.products.length} מוצרים</Badge><Badge>{sp.clients.filter((c) => c.status === "active").length} לקוחות</Badge>{sp.source && sp.source !== "direct" && <Badge tone="amber">📣 {sp.source}</Badge>}<Badge>{sp.orders.length} הזמנות</Badge>{nw > 0 && <Badge tone="amber">{nw} חדשות</Badge>}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(rev)}</span><button onClick={(e) => { e.stopPropagation(); onEnter(sp.id); }} style={{ border: `1px solid ${C.green}`, background: C.greenSoft, color: C.greenDeep, fontWeight: 700, fontSize: 13, padding: "7px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><LogIn size={14} /> כניסה לניהול</button></div>
            </div>
          ); })}
        </div>
      </Panel>
      {!agentMode && (
        <Panel style={{ boxShadow: SH }}>
          <SectionTitle icon={<ShieldCheck size={18} />}>סוכני-על / תמיכה</SectionTitle>
          <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>סוכני-על יכולים להוסיף ספקים חדשים ולתת תמיכה (כניסה לניהול של כל ספק).</div>
          <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>{(state.superAgents || []).map((a) => (<div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px" }}><Badge tone="plum">סוכן-על</Badge><div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{a.name}</div><div style={{ fontSize: 12, color: C.sub }}>{a.email}</div></div><button onClick={() => delAgent(a.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button></div>))}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, alignItems: "end" }}>
            <MiniField label="שם" value={sf.name} onChange={(v) => setSf({ ...sf, name: v })} />
            <MiniField label="אימייל" value={sf.email} onChange={(v) => setSf({ ...sf, email: v })} />
            <MiniField label="סיסמה" value={sf.password} onChange={(v) => setSf({ ...sf, password: v })} />
            <button onClick={addAgent} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "10px 16px", borderRadius: 10, cursor: "pointer", height: 40 }}>הוסף</button>
          </div>
          {saErr && <ErrBox>{saErr}</ErrBox>}
        </Panel>
      )}
      {add && <Modal onClose={() => setAdd(false)} title="הוספת ספק חדש"><SupplierRegister state={state} setState={setState} byAdmin onDone={() => setAdd(false)} back={() => setAdd(false)} /></Modal>}
      </>}
    </div>
  );
}
function DemoCenter({ demoSup, createDemo, resetDemo, enterRole }) {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel style={{ boxShadow: SH, borderColor: "#BBD3F5", background: "#F5F9FF" }}>
        <SectionTitle icon={<Building2 size={18} />}>מרכז הדגמה — הצגת כל התהליך לספקים</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 10, lineHeight: 1.6 }}>בחר סוג ספק ליצירת הדגמה — ייווצרו אוטומטית מוצרים, קטגוריות, לקוחות, צוות והזמנות מתאימים. לאחר מכן היכנס לכל תפקיד להצגת כל המסע.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 8, marginBottom: 4 }}>
          {DEMO_KINDS.map(([k, label, emoji]) => { const on = demoSup && demoSup.id.indexOf("demo") === 0 && (DEMO_TEMPLATES[k] && demoSup.category === DEMO_TEMPLATES[k].category); return (
            <button key={k} onClick={() => createDemo(k)} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.ink, borderRadius: 12, padding: "12px 8px", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}><span style={{ fontSize: 24 }}>{emoji}</span>{label}</button>
          ); })}
        </div>
        {demoSup && (
          <div style={{ marginTop: 16, borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
            <div style={{ fontSize: 13, color: C.ink, fontWeight: 700, marginBottom: 10 }}>הדגמה פעילה: {demoSup.name} — היכנס לכל תפקיד:</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 }}>
              {[["client", "לקוח — מזמין", ShoppingCart, C.green], ["picker", "מלקט — שוקל", Scale, C.amber], ["driver", "נהג — מוסר", Truck, C.plum], ["agent", "סוכן — תמיכה", MessageSquare, C.blue], ["supplier", "ניהול הספק", Building2, C.greenDeep]].map(([role, label, Icon, col]) => (
                <button key={role} onClick={() => enterRole(role)} style={{ border: `1px solid ${col}`, background: "#fff", color: col, fontWeight: 800, fontSize: 13.5, padding: "14px 10px", borderRadius: 12, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}><Icon size={22} />{label}</button>
              ))}
            </div>
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, marginTop: 14, fontSize: 12.5, color: C.sub, lineHeight: 1.7 }}>
              <b style={{ color: C.ink }}>תסריט הדגמה מומלץ:</b><br />
              1. <b>לקוח</b> → "הזמנה חדשה" → בחר מוצרים ושלח.<br />
              2. <b>מלקט</b> (או הספק עצמו) → שקול וסמן שסופק → נוצרת חשבונית.<br />
              3. <b>ניהול הספק</b> → הזמנות → הצב נהג + קבע יום ושעת אספקה → "עדכן לקוח".<br />
              4. <b>נהג</b> → "אספתי" ואז "נמסר".<br />
              5. <b>לקוח</b> → דף הבית → רואה עדכון מועד אספקה + חשבונית.
            </div>
            <button onClick={resetDemo} style={{ border: `1px solid ${C.red}`, background: "#fff", color: C.red, fontWeight: 700, fontSize: 14, padding: "10px 16px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginTop: 14 }}><Trash2 size={15} /> מחק הדגמה</button>
          </div>
        )}
      </Panel>
    </div>
  );
}
function LoginForm({ state, onLogin, back, onForgot }) {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [remember, setRemember] = useState(false);
  useEffect(() => { (async () => { try { const r = await window.storage.get("vegapp:remember"); if (r && r.value) { const d = JSON.parse(r.value); setEmail(d.email || ""); setPw(d.pw || ""); setRemember(true); } } catch {} })(); }, []);
  const finish = (sess) => { (async () => { try { if (remember) await window.storage.set("vegapp:remember", JSON.stringify({ email, pw })); else await window.storage.delete("vegapp:remember"); } catch {} })(); onLogin(sess); };
  const submit = () => {
    const em = email.trim().toLowerCase();
    if (pw === (state.superPw || SUPER_PW) && (em === "" || em === "super")) return finish({ kind: "super" });
    const sa = (state.superAgents || []).find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
    if (sa) return finish({ kind: "superagent", userId: sa.id });
    let clientActive = false, clientPending = false;
    for (const sup of state.suppliers) {
      if (sup.status !== "active") continue;
      if (sup.owner && sup.owner.email.trim().toLowerCase() === em && sup.owner.password === pw) return finish({ kind: "supplier", supplierId: sup.id });
      const st = sup.staff.find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
      if (st) return finish({ kind: st.role, supplierId: sup.id, userId: st.id });
      const c = sup.clients.find((x) => x.email.trim().toLowerCase() === em && x.password === pw);
      if (c) { if (c.status === "active") clientActive = true; else clientPending = true; }
    }
    if (clientActive) return finish({ kind: "client", email: em, pw });
    if (clientPending) { setErr("החשבון ממתין לאישור הספק"); return; }
    setErr("אימייל או סיסמה שגויים");
  };
  return (
    <Card title="התחברות" back={back}>
      <Field label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@business.co.il" />
      <Field label="סיסמה" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0 10px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> זכור אותי</label>
        <button onClick={onForgot} style={{ border: "none", background: "transparent", color: C.green, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0 }}>שכחתי סיסמה</button>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <SubmitBtn onClick={submit}>כניסה</SubmitBtn>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 10, textAlign: "center", lineHeight: 1.7 }}>מנהל-על: super/super · ספק: admin@sadeh.co.il/1234<br />לקוח: gan@demo.co.il · picker@ / driver@ / agent@demo.co.il · 1234</div>
    </Card>
  );
}
function ForgotForm({ state, back }) {
  const [email, setEmail] = useState(""); const [res, setRes] = useState(null);
  const find = () => {
    const em = email.trim().toLowerCase(); let pw = null;
    for (const sup of state.suppliers) {
      if (sup.owner && sup.owner.email.trim().toLowerCase() === em) pw = sup.owner.password;
      const u = [...sup.clients, ...sup.staff].find((x) => x.email.trim().toLowerCase() === em);
      if (u) pw = u.password;
    }
    setRes(pw ? { ok: true, pw } : { ok: false });
  };
  return (
    <Card title="שחזור סיסמה" back={back}>
      <Field label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@business.co.il" />
      <SubmitBtn onClick={find}>שחזר סיסמה</SubmitBtn>
      {res && (res.ok
        ? <div style={{ marginTop: 12, background: C.greenSoft, color: C.greenDeep, padding: 12, borderRadius: 10, fontSize: 14 }}>הסיסמה שלך: <b style={{ fontSize: 16 }}>{res.pw}</b><div style={{ fontSize: 12, color: C.sub, marginTop: 6 }}>בגרסה האמיתית יישלח קישור לאיפוס לאימייל.</div></div>
        : <ErrBox>לא נמצא חשבון עם האימייל הזה</ErrBox>)}
    </Card>
  );
}
function RegisterForm({ state, setState, back, byManager, onDone, lockSupplier }) {
  const suppliers = byManager ? [] : (state.suppliers || []).filter((x) => x.status === "active");
  const [f, setF] = useState({ name: "", contact: "", phone: "", address: "", email: "", password: "", taxId: "", structure: STRUCTURES[1], category: CATEGORIES[0], pay: "cash", docs: [], supId: lockSupplier || (suppliers[0] ? suppliers[0].id : "") });
  const [err, setErr] = useState(""); const [done, setDone] = useState(false);
  const [stage, setStage] = useState("form"); const [genCode, setGenCode] = useState(""); const [codeInput, setCodeInput] = useState(""); const [sentTo, setSentTo] = useState("");
  const [agree, setAgree] = useState(false); const [showTerms, setShowTerms] = useState(false);
  const sendCode = () => { const code = String(Math.floor(100000 + Math.random() * 900000)); setGenCode(code); setSentTo(f.email.trim()); setCodeInput(""); setStage("verify"); /* חיבור עתידי: כאן תישלח הודעת מייל עם הקוד דרך שירות מייל (Supabase/Resend) */ };
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const addDocs = (files) => { const names = Array.from(files).map((x) => x.name); setF((s) => ({ ...s, docs: [...s.docs, ...names] })); };
  const mkClient = (status) => ({ id: "c" + Date.now(), name: f.name, contact: f.contact, phone: f.phone, address: f.address, email: f.email, password: f.password, taxId: f.taxId, structure: f.structure, category: f.category, pay: f.pay, docs: f.docs, status, target: 20, createdAt: Date.now(), terms: byManager ? null : { version: TERMS_VERSION, acceptedAt: Date.now() } });
  const submit = () => {
    if (!f.name || !f.email || !f.password) return setErr("שם העסק, אימייל וסיסמה הם שדות חובה");
    const em = f.email.trim().toLowerCase();
    if (byManager) {
      if ([...state.clients, ...state.staff].some((c) => c.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום");
      setState((s) => ({ ...s, clients: [...s.clients, mkClient("active")] }));
      if (onDone) return onDone();
      return setDone(true);
    }
    if (!f.supId) return setErr("בחר ספק להזמנה");
    const sup = state.suppliers.find((x) => x.id === f.supId);
    if (sup && [...sup.clients, ...sup.staff].some((c) => c.email.trim().toLowerCase() === em)) return setErr("אימייל זה כבר רשום אצל הספק");
    if (!byManager && !agree) return setErr("יש לאשר את התקנון כדי להמשיך");
    setErr(""); sendCode();
  };
  const finalizeAfterVerify = () => {
    const client = mkClient("pending");
    setState((root) => ({ ...root, suppliers: root.suppliers.map((sp) => sp.id === f.supId ? { ...sp, clients: [...sp.clients, { ...client, emailVerified: true }] } : sp) }));
    setDone(true);
  };
  const confirmCode = () => { if (codeInput.trim() !== genCode) return setErr("הקוד שגוי, נסה שוב"); setErr(""); finalizeAfterVerify(); };
  if (stage === "verify" && !done) return (
    <Card title="אימות אימייל" back={() => { setStage("form"); setErr(""); }} wide>
      <div style={{ textAlign: "center", padding: "6px 0 2px" }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: C.blueSoft, color: C.blue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Mail size={26} /></div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>שלחנו קוד אימות</div>
        <div style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.6, marginBottom: 6 }}>הזן את הקוד בן 6 הספרות שנשלח לכתובת<br /><b style={{ color: C.ink }}>{sentTo}</b></div>
      </div>
      <div style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 12.5, textAlign: "center", marginBottom: 12, lineHeight: 1.6 }}>מצב הדגמה: שליחת מייל אמיתית תופעל בחיבור שירות מייל. הקוד שלך כעת: <b style={{ fontSize: 15 }}>{genCode}</b></div>
      <input value={codeInput} onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="______" inputMode="numeric" style={{ width: "100%", textAlign: "center", letterSpacing: 8, fontSize: 24, fontWeight: 800, border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px", fontFamily: "inherit", boxSizing: "border-box" }} />
      {err && <ErrBox>{err}</ErrBox>}
      <SubmitBtn onClick={confirmCode}>אמת והמשך</SubmitBtn>
      <button onClick={sendCode} style={{ width: "100%", marginTop: 8, border: "none", background: "transparent", color: C.blue, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>שלח קוד מחדש</button>
    </Card>
  );
  if (done) return (<Card title={byManager ? "הלקוח נוסף" : "הבקשה נשלחה"} back={back}><div style={{ textAlign: "center", padding: "10px 0" }}><div style={{ width: 54, height: 54, borderRadius: "50%", background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Clock size={26} /></div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>תודה, {f.name}!</div><div style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>{byManager ? "הלקוח נוסף בהצלחה." : "הבקשה ממתינה לאישור הספק. לאחר האישור תוכל להתחבר ולהזמין."}</div></div><SubmitBtn onClick={back}>חזרה</SubmitBtn></Card>);
  const body = (
    <>
      {!byManager && !lockSupplier && (
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>בחר ספק להזמנה *</div><select value={f.supId} onChange={set("supId")} style={fieldStyle}>{suppliers.length === 0 && <option value="">אין ספקים זמינים</option>}{suppliers.map((sp) => <option key={sp.id} value={sp.id}>{sp.name} · {sp.category}</option>)}</select></label>
      )}
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם העסק *" value={f.name} onChange={set("name")} /><Field label="איש קשר" value={f.contact} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone} onChange={set("phone")} /><Field label="כתובת למשלוח" value={f.address} onChange={set("address")} />
        <Field label="מספר עוסק / ח.פ" value={f.taxId} onChange={set("taxId")} /><Field label="אימייל (לכניסה) *" value={f.email} onChange={set("email")} />
        <Field label="סיסמה *" type="password" value={f.password} onChange={set("password")} /><div />
        <Select label="סוג התאגדות" value={f.structure} onChange={set("structure")} options={STRUCTURES} /><Select label="סוג העסק" value={f.category} onChange={set("category")} options={CATEGORIES} />
      </div>
      <div style={{ marginTop: 4, marginBottom: 4, fontSize: 13, color: C.sub }}>אופן תשלום</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {Object.entries(PAY).map(([k, v]) => { const Icon = v.icon, active = f.pay === k; return (<button key={k} onClick={() => setF((s) => ({ ...s, pay: k }))} style={{ border: `1.5px solid ${active ? C.green : C.line}`, background: active ? C.greenSoft : "#fff", color: active ? C.greenDeep : C.sub, borderRadius: 12, padding: "11px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}><Icon size={19} />{v.label}</button>); })}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 6 }}>מסמכים (ת.ז / עוסק מורשה / תעודת התאגדות)</div>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><Paperclip size={15} /> צרף קבצים<input type="file" multiple onChange={(e) => addDocs(e.target.files)} style={{ display: "none" }} /></label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{f.docs.map((d, i) => <Badge key={i} icon={<FileText size={11} />}>{d}</Badge>)}</div>
      </div>
      {!byManager && <TermsBox agree={agree} setAgree={setAgree} />}
      {err && <ErrBox>{err}</ErrBox>}<SubmitBtn onClick={submit}>{byManager ? "הוסף לקוח" : "שליחת בקשה לספק"}</SubmitBtn>
      {showTerms && <Modal onClose={() => setShowTerms(false)} title="תקנון השימוש"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: C.ink, lineHeight: 1.7, maxHeight: 360, overflow: "auto" }}>{TERMS}</div></Modal>}
    </>
  );
  return byManager ? body : <Card title="הרשמת עסק (לקוח)" back={back} wide>{body}</Card>;
}
function DomainPicker({ selected = [], onChange, required }) {
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  return (
    <div style={{ marginBottom: 12, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>תחומי פעילות{required ? " *" : ""}</div>
      <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 10 }}>סמנו את כל התחומים שאתם מוכרים — כך לקוחות ימצאו אתכם בחיפוש, וזה מה שיופיע להם ב"הזמנה חדשה".</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(138px,1fr))", gap: 6 }}>
        {SUP_DOMAINS.map((d) => { const on = selected.includes(d.id); return <button key={d.id} type="button" onClick={() => toggle(d.id)} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.ink, borderRadius: 10, padding: "8px 8px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, textAlign: "right" }}><span style={{ fontSize: 17 }}>{d.emoji}</span><span style={{ flex: 1 }}>{d.label}</span>{on && <Check size={14} />}</button>; })}
      </div>
      {selected.length > 0 && <div style={{ fontSize: 12.5, color: C.greenDeep, marginTop: 8 }}>נבחרו {selected.length}: {selected.map((id) => DOMAIN_BY_ID[id] && DOMAIN_BY_ID[id].label).filter(Boolean).join(" · ")}</div>}
    </div>
  );
}
function TermsBox({ agree, setAgree }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>תקנון ותנאי שימוש</div>
      <div style={{ whiteSpace: "pre-wrap", fontSize: 12, color: C.ink, lineHeight: 1.65, maxHeight: 170, overflow: "auto", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", background: "#F7F9FC" }}>{TERMS}</div>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: C.ink, marginTop: 8, cursor: "pointer" }}><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3 }} /> <span>קראתי את התקנון ואני מסכים/ה לו, לרבות סעיפי הגבלת האחריות והשיפוי. אני מצהיר/ה שאני מוסמך/ת לפעול בשם העסק.</span></label>
    </div>
  );
}
function Card({ title, children, back, wide }) { return (<div style={{ width: "100%", maxWidth: wide ? 580 : 380, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: 24, boxShadow: SH }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>{back && <button onClick={back} style={{ border: "none", background: "#EEF1EC", borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: C.sub, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>}<h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>{title}</h2></div>{children}</div>); }

/* ============ CLIENT ============ */
function StaffRolePicker({ me, onPick }) {
  const roles = [me.role, ...((me.roles) || [])].filter((v, i, a) => a.indexOf(v) === i);
  const meta = { picker: { icon: Scale, tone: "amber", desc: "ליקוט ושקילת הזמנות" }, driver: { icon: Truck, tone: "plum", desc: "איסוף ומסירת משלוחים" }, agent: { icon: MessageSquare, tone: "blue", desc: "תמיכה והזמנות ללקוחות" } };
  const map = { amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum], blue: [C.blueSoft, C.blue] };
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "24px 26px", background: `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ fontSize: 14, color: C.sub, fontWeight: 600 }}>שלום, {me.name}</div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>באיזה תפקיד תרצה לעבוד עכשיו?</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 4 }}>הוצבו לך כמה תפקידים — בחר מסך.</div>
        </div>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {roles.map((r) => { const m = meta[r] || { icon: ShieldCheck, tone: "blue", desc: "" }; const Ic = m.icon; const [bg, fg] = map[m.tone] || ["#EEF1EC", C.ink]; return (
          <button key={r} onClick={() => onPick(r)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 18, padding: 20, background: "#fff", cursor: "pointer", boxShadow: SH, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic size={26} /></div>
            <div><div style={{ fontWeight: 800, fontSize: 18 }}>{ROLE_LABEL[r]}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{m.desc}</div></div>
          </button>
        ); })}
      </div>
    </div>
  );
}
function ProfileModal({ session, state, setState, sup, onClose, onGo }) {
  const kind = session.kind;
  const roleLabel = kind === "super" ? "מנהל-על" : ROLE_LABEL[kind] || kind;
  let rec = null;
  if (kind === "super") rec = { name: "מנהל-על", email: "super", contact: "", phone: "", password: state.superPw || "super" };
  else if (kind === "supplier" && sup) rec = { name: sup.name, email: (sup.owner && sup.owner.email) || "", contact: (sup.owner && sup.owner.contact) || "", phone: (sup.owner && sup.owner.phone) || "", password: (sup.owner && sup.owner.password) || "" };
  else if (kind === "client") { const em = (session.email || "").trim().toLowerCase(); for (const s2 of state.suppliers) { const c = s2.clients.find((c) => c.email.trim().toLowerCase() === em); if (c) rec = c; } }
  else if (sup) rec = sup.staff.find((x) => x.id === session.userId);
  const [f, setF] = useState({ name: rec ? rec.name || "" : "", contact: rec ? rec.contact || "" : "", phone: rec ? rec.phone || "" : "", email: rec ? rec.email || "" : "" });
  const [pw1, setPw1] = useState(""); const [pw2, setPw2] = useState(""); const [msg, setMsg] = useState("");
  const emailEditable = kind === "supplier" || kind === "picker" || kind === "driver" || kind === "agent";
  const showContact = kind === "supplier" || kind === "client";
  const showName = kind !== "super";
  const save = () => {
    if (pw1 && pw1 !== pw2) { setMsg("הסיסמאות אינן תואמות"); return; }
    const np = pw1 || null;
    if (kind === "super") setState((r) => ({ ...r, superPw: np || r.superPw || "super" }));
    else if (kind === "supplier" && sup) setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sup.id ? { ...s2, name: f.name || s2.name, owner: { ...(s2.owner || {}), contact: f.contact, phone: f.phone, email: f.email || (s2.owner && s2.owner.email), password: np || (s2.owner && s2.owner.password) } } : s2) }));
    else if (kind === "client") { const em = (session.email || "").trim().toLowerCase(); setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => ({ ...s2, clients: s2.clients.map((c) => c.email.trim().toLowerCase() === em ? { ...c, name: f.name, contact: f.contact, phone: f.phone, password: np || c.password } : c) })) })); }
    else if (sup) setState((r) => ({ ...r, suppliers: r.suppliers.map((s2) => s2.id === sup.id ? { ...s2, staff: s2.staff.map((u) => u.id === session.userId ? { ...u, name: f.name, email: f.email || u.email, password: np || u.password } : u) } : s2) }));
    setMsg("נשמר בהצלחה" + (np ? " · הסיסמה עודכנה" : "")); setPw1(""); setPw2("");
  };
  return (
    <Modal onClose={onClose} title="הפרופיל שלי">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: C.greenSoft, color: C.greenDeep, display: "flex", alignItems: "center", justifyContent: "center" }}><User size={22} /></div>
        <div><div style={{ fontWeight: 800, fontSize: 16 }}>{f.name || roleLabel}</div><Badge>{roleLabel}</Badge></div>
      </div>
      {kind === "supplier" && sup && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <Logo size={52} img={sup.brand && sup.brand.logo} name={f.name || sup.name} />
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> העלה לוגו של החנות<input type="file" accept="image/*" onChange={(e) => pickImage(e.target.files[0], 360, (d) => setState((st) => ({ ...st, suppliers: st.suppliers.map((s2) => s2.id === sup.id ? { ...s2, brand: { ...(s2.brand || {}), logo: d } } : s2) })))} style={{ display: "none" }} /></label>
        </div>
      )}
      {kind === "supplier" && sup && onGo && <button onClick={() => onGo("finance")} style={{ width: "100%", marginBottom: 12, border: `1px solid ${C.line}`, background: "#F7F9FC", borderRadius: 12, padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "right" }}><Receipt size={18} color={C.plum} /><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 14 }}>החשבוניות וההוצאות שלי</div><div style={{ fontSize: 12, color: C.sub }}>{(sup.purchaseInvoices || []).length} חשבוניות קנייה · מסודרות לפי חודשים</div></div><ChevronLeft size={16} color={C.sub} /></button>}
      {showName && <Field label={kind === "supplier" || kind === "client" ? "שם העסק" : "שם"} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}
      {showContact && <Field label="איש קשר" value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} />}
      {showContact && <Field label="טלפון" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />}
      <Field label="אימייל" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} disabled={!emailEditable} />
      <div style={{ borderTop: `1px solid ${C.line}`, margin: "8px 0 0", paddingTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><KeyRound size={15} /> שינוי סיסמה</div>
        <Field label="סיסמה חדשה" type="password" value={pw1} onChange={(e) => setPw1(e.target.value)} placeholder="השאר ריק כדי לא לשנות" />
        <Field label="אימות סיסמה" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
      </div>
      {msg && <div style={{ background: msg.includes("אינן") ? C.redSoft : C.greenSoft, color: msg.includes("אינן") ? C.red : C.greenDeep, padding: "9px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{msg}</div>}
      <SubmitBtn onClick={save}>שמור שינויים</SubmitBtn>
    </Modal>
  );
}
function BusinessHub({ state, setState, email, onEnter, onJoin }) {
  const [tab, setTab] = useState("mine"); const [joinTo, setJoinTo] = useState(null); const [joinNote, setJoinNote] = useState(""); const [msgTo, setMsgTo] = useState(null);
  const [q, setQ] = useState(""); const [area, setArea] = useState(""); const [city, setCity] = useState(""); const [cat, setCat] = useState("");
  const emL = (email || "").trim().toLowerCase();
  const anyRec = state.suppliers.map((sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === emL)).find(Boolean) || null;
  const [pf, setPf] = useState({ name: anyRec ? anyRec.name : "", contact: anyRec ? anyRec.contact || "" : "", phone: anyRec ? anyRec.phone || "" : "", address: anyRec ? anyRec.address || "" : "", taxId: anyRec ? anyRec.taxId || "" : "" });
  const patchAll = (patch) => setState((root) => ({ ...root, suppliers: root.suppliers.map((sp) => ({ ...sp, clients: sp.clients.map((c) => c.email.trim().toLowerCase() === emL ? { ...c, ...patch } : c) })) }));
  const pickLogo = (file) => pickImage(file, 360, (d) => patchAll({ logo: d }));
  const em = (email || "").trim().toLowerCase();
  const recOf = (sp) => sp.clients.find((c) => c.email.trim().toLowerCase() === em);
  const active = state.suppliers.filter((s) => s.status === "active");
  const mine = active.filter((s) => recOf(s));
  const others = active.filter((s) => !recOf(s));
  const regions = Array.from(new Set(active.flatMap((s) => (s.regions || "").split(",").map((x) => x.trim()).filter(Boolean))));
  const matchText = (s) => { const t = q.trim().toLowerCase(); if (!t) return true; const hay = (s.name + " " + s.category + " " + domainLabel(s) + " " + ((s.cats) || []).join(" ") + " " + (s.regions || "") + " " + (s.products || []).map((p) => p.name).join(" ")).toLowerCase(); return hay.includes(t); };
  const domCount = (id) => active.filter((s) => domainsOf(s).some((d) => d.id === id)).length;
  const catOkFull = (s) => !cat || domainsOf(s).some((d) => d.id === cat);
  const geoOk = (s) => { const r = s.regions || ""; if (city) return r.includes(city); if (area) return r.includes(area) || (AREAS[area] || []).some((c) => r.includes(c)); return true; };
  const catOk = (s) => !cat || (s.category || "").includes(cat);
  const found = others.filter((s) => geoOk(s) && catOkFull(s) && matchText(s));
  const dir = active.filter((s) => geoOk(s) && catOkFull(s) && matchText(s));
  const matchedProducts = (s) => q.trim() ? (s.products || []).filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())).map((p) => p.name) : [];
  const businessName = mine[0] ? recOf(mine[0]).name : "העסק שלי";
  const tabs = [["mine", "הספקים שלי", Building2], ["find", "מצא ספקים", Search], ["profile", "הפרופיל שלי", ShieldCheck]];
  const card = (sp, cta, onOpen) => { const color = (sp.brand && sp.brand.color) || C.green; return (
    <div key={sp.id} className={onOpen ? "tp-click" : undefined} onClick={onOpen} title={onOpen ? "כניסה לחנות" : undefined} style={{ border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: SH, cursor: onOpen ? "pointer" : "default" }}>
      <div style={{ height: 8, background: color }} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Logo size={40} img={sp.brand && sp.brand.logo} name={sp.name} /><div><div style={{ fontWeight: 800 }}>{sp.name}</div><div style={{ fontSize: 12, color: C.sub }}>{domainsOf(sp).length ? domainsOf(sp).map((d) => d.emoji + " " + d.label).join(" · ") : sp.category}</div></div></div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", margin: "10px 0" }}>{(sp.regions || "").split(",").map((r) => r.trim()).filter(Boolean).map((r) => <Badge key={r} icon={<MapPin size={11} />}>{r}</Badge>)}</div>
        <div onClick={(e) => e.stopPropagation()}>{cta}</div>
      </div>
    </div>
  ); };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "24px 26px", background: `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Logo size={46} img={anyRec && anyRec.logo} name={businessName} /><div><div style={{ fontSize: 14, color: C.sub, fontWeight: 600 }}>שלום,</div><div style={{ fontWeight: 800, fontSize: 24 }}>{businessName}</div></div></div>
          <div style={{ fontSize: 14, color: C.sub, marginTop: 4 }}>בחר ספק להזמנה, או גלה ספקים חדשים לפי אזור ומוצר</div>
        </div>
      </Panel>
      <Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ mine: mine.length }} />
      {tab === "mine" && (mine.length === 0 ? <Empty>עדיין לא הצטרפת לספקים. עבור ל"מצא ספקים".</Empty> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
          {mine.map((sp) => { const rec = recOf(sp); const color = (sp.brand && sp.brand.color) || C.green; return card(sp, rec.status !== "active"
            ? <div style={{ display: "grid", gap: 8 }}><Badge tone="amber"><Clock size={12} /> ממתין לאישור הספק</Badge><button onClick={() => setMsgTo(sp)} style={{ width: "100%", border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, padding: "9px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><MessageSquare size={15} /> הודעה לספק</button></div>
            : <button onClick={() => onEnter(sp.id)} style={{ width: "100%", border: "none", background: color, color: "#fff", fontWeight: 800, padding: "10px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ShoppingCart size={16} /> כניסה לחנות</button>, rec.status === "active" ? () => onEnter(sp.id) : undefined); })}
        </div>)}
      {tab === "find" && (
        <div style={{ display: "grid", gap: 14 }}>
          <Panel style={{ boxShadow: SH, padding: 0, overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(120deg, ${C.greenDeep}, ${C.green})`, color: "#fff", padding: "16px 18px" }}>
              <div style={{ fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}><Search size={18} /> חיפוש ספקים</div>
              <div style={{ fontSize: 13, opacity: .9, marginTop: 2 }}>סננו לפי אזור, עיר וקטגוריה — ומצאו את הספק המתאים לעסק שלכם</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 12px", marginBottom: 12 }}><Search size={16} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש חופשי: שם ספק / מוצר (למשל: חד פעמי)" style={{ border: "none", outline: "none", padding: "11px 4px", fontSize: 14, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
                <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 4, fontWeight: 600 }}>אזור</div><select value={area} onChange={(e) => { setArea(e.target.value); setCity(""); }} style={{ ...fieldStyle, padding: "10px" }}><option value="">כל האזורים</option>{Object.keys(AREAS).map((r) => <option key={r} value={r}>{r}</option>)}</select></label>
                <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 4, fontWeight: 600 }}>עיר</div><select value={city} onChange={(e) => setCity(e.target.value)} disabled={!area} style={{ ...fieldStyle, padding: "10px", opacity: area ? 1 : .5 }}><option value="">{area ? "כל הערים ב" + area : "בחר אזור קודם"}</option>{(AREAS[area] || []).map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
                <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 4, fontWeight: 600 }}>תחום</div><select value={cat} onChange={(e) => setCat(e.target.value)} style={{ ...fieldStyle, padding: "10px" }}><option value="">כל התחומים</option>{SUP_DOMAINS.map((d) => <option key={d.id} value={d.id}>{d.emoji} {d.label}{domCount(d.id) ? " (" + domCount(d.id) + ")" : ""}</option>)}</select></label>
              </div>
              {(q || area || city || cat) && <button onClick={() => { setQ(""); setArea(""); setCity(""); setCat(""); }} style={{ marginTop: 12, border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 13, padding: "8px 14px", borderRadius: 9, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}><X size={14} /> נקה סינון</button>}
            </div>
          </Panel>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>{[{ id: "", label: "הכל", emoji: "🛒" }, ...SUP_DOMAINS].map((d) => { const on = cat === d.id; return <button key={d.id || "all"} onClick={() => setCat(d.id)} style={{ whiteSpace: "nowrap", border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.ink, borderRadius: 20, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{d.emoji} {d.label}</button>; })}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: 14, color: C.ink, fontWeight: 800 }}>{dir.length} ספקים</div>
            <div style={{ fontSize: 13, color: C.sub }}>{city ? "ב" + city : area ? "ב" + area : "בכל הארץ"}{cat ? " · " + (DOMAIN_BY_ID[cat] || {}).label : ""}</div>
          </div>
          {dir.length === 0 ? <Empty>לא נמצאו ספקים לפי הסינון</Empty> :
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
              {dir.map((sp) => { const color = (sp.brand && sp.brand.color) || C.green; const rec = recOf(sp); const mp = matchedProducts(sp); const cta = rec ? (rec.status === "active"
                ? <button onClick={() => onEnter(sp.id)} style={{ width: "100%", border: "none", background: color, color: "#fff", fontWeight: 800, padding: "10px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ShoppingCart size={16} /> כניסה לחנות</button>
                : <div style={{ display: "grid", gap: 8 }}><Badge tone="amber"><Clock size={12} /> ממתין לאישור</Badge><button onClick={() => setMsgTo(sp)} style={{ width: "100%", border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, padding: "9px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><MessageSquare size={15} /> הודעה לספק</button></div>)
                : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><button onClick={() => { setJoinTo(sp); setJoinNote(""); }} style={{ border: "none", background: color, color: "#fff", fontWeight: 800, padding: "10px 6px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13.5 }}><UserPlus size={15} /> בקש להצטרף</button><button onClick={() => setMsgTo(sp)} style={{ border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, padding: "10px 6px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13.5 }}><MessageSquare size={15} /> שלח הודעה</button></div>;
                return card(sp, <div>{mp.length > 0 && <div style={{ fontSize: 12, color: C.greenDeep, background: C.greenSoft, borderRadius: 8, padding: "5px 8px", marginBottom: 8 }}>נמצא: {mp.slice(0, 3).join(", ")}</div>}{cta}</div>); })}
            </div>}
        </div>
      )}
      {joinTo && <Modal onClose={() => setJoinTo(null)} title={"בקשת הצטרפות · " + joinTo.name}>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>ההודעה תגיע לספק יחד עם הבקשה ותופיע אצלו בצ'אט — למשל סוג העסק, כמויות משוערות, ימי אספקה או בקשה מיוחדת.</div>
        <textarea value={joinNote} onChange={(e) => setJoinNote(e.target.value)} placeholder={"שלום, אנחנו " + businessName + ". נשמח לעבוד איתכם…"} rows={4} style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }} />
        <SubmitBtn onClick={() => { onJoin(joinTo.id, joinNote); setJoinTo(null); }}>שלח בקשת הצטרפות</SubmitBtn>
      </Modal>}
      {msgTo && <HubMessage sp={state.suppliers.find((x) => x.id === msgTo.id) || msgTo} rec={recOf(state.suppliers.find((x) => x.id === msgTo.id) || msgTo)} me={anyRec} email={em} setState={setState} onClose={() => setMsgTo(null)} />}
      {tab === "profile" && (
        <div style={{ display: "grid", gap: 16 }}>
          <Panel style={{ boxShadow: SH }}>
            <SectionTitle icon={<ShieldCheck size={18} />}>פרופיל העסק שלי</SectionTitle>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <Logo size={58} img={anyRec && anyRec.logo} name={pf.name || businessName} />
              <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> העלה לוגו של העסק<input type="file" accept="image/*" onChange={(e) => pickLogo(e.target.files[0])} style={{ display: "none" }} /></label>
            </div>
            <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
              <Field label="שם העסק" value={pf.name} onChange={(e) => setPf({ ...pf, name: e.target.value })} />
              <Field label="איש קשר" value={pf.contact} onChange={(e) => setPf({ ...pf, contact: e.target.value })} />
              <Field label="טלפון" value={pf.phone} onChange={(e) => setPf({ ...pf, phone: e.target.value })} />
              <Field label="כתובת" value={pf.address} onChange={(e) => setPf({ ...pf, address: e.target.value })} />
              <Field label="ע.מ / ח.פ" value={pf.taxId} onChange={(e) => setPf({ ...pf, taxId: e.target.value })} />
            </div>
            <div style={{ fontSize: 12, color: C.sub, margin: "4px 0 8px" }}>הפרטים והלוגו מתעדכנים אצל כל הספקים שאתה עובד איתם.</div>
            <SubmitBtn onClick={() => patchAll(pf)}>שמור פרופיל</SubmitBtn>
          </Panel>
        </div>
      )}
    </div>
  );
}
// הודעה לספק מתוך "מצא ספקים": לקוח קיים/ממתין → צ'אט רגיל; עסק שעוד לא הצטרף → פנייה (inquiry)
function HubMessage({ sp, rec, me, email, setState, onClose }) {
  const [text, setText] = useState("");
  const spSet = (u) => setState((root) => ({ ...root, suppliers: root.suppliers.map((x) => x.id === sp.id ? (typeof u === "function" ? u(x) : u) : x) }));
  const inq = (sp.inquiries || []).find((q) => q.email === email);
  const thread = rec ? null : (inq ? inq.msgs : []);
  useEffect(() => { if (inq && inq.unreadClient) spSet((x) => ({ ...x, inquiries: (x.inquiries || []).map((q) => q.email === email ? { ...q, unreadClient: false } : q) })); }, []);
  const sendInquiry = () => { const t = text.trim(); if (!t) return; const m = { id: "iq" + Date.now(), from: "client", text: t, ts: Date.now() }; spSet((x) => { const list = x.inquiries || []; const ex = list.find((q) => q.email === email); const nq = ex ? { ...ex, msgs: [...ex.msgs, m], unread: true, ts: Date.now() } : { id: "q" + Date.now(), email, name: (me && me.name) || email, contact: (me && me.contact) || "", phone: (me && me.phone) || "", category: (me && me.category) || "", msgs: [m], unread: true, ts: Date.now() }; return { ...x, inquiries: ex ? list.map((q) => q.email === email ? nq : q) : [nq, ...list] }; }); setText(""); };
  return (
    <Modal onClose={onClose} title={"הודעה ל" + sp.name}>
      {rec ? <Chat state={sp} setState={spSet} clientId={rec.id} meRole="client" meName={rec.name} embedded /> : (
        <div>
          <div style={{ fontSize: 13, color: C.sub, marginBottom: 10, lineHeight: 1.6 }}>אפשר לשאול את הספק שאלות לפני שמצטרפים — מחירים, אזורי חלוקה, מינימום הזמנה. התשובה תופיע כאן.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflow: "auto", marginBottom: 12, padding: 4 }}>
            {thread.length === 0 && <Empty>עדיין אין הודעות</Empty>}
            {thread.map((m) => <div key={m.id} style={{ alignSelf: m.from === "client" ? "flex-start" : "flex-end", maxWidth: "82%" }}><div style={{ background: m.from === "client" ? C.green : "#EEF1EC", color: m.from === "client" ? "#fff" : C.ink, borderRadius: 14, padding: "8px 12px", fontSize: 14 }}>{m.text}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3 }}>{m.from === "client" ? "" : sp.name + " · "}{dayStr(m.ts)}</div></div>)}
          </div>
          <div style={{ display: "flex", gap: 8 }}><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendInquiry()} placeholder="כתוב הודעה לספק…" style={{ ...fieldStyle, flex: 1 }} /><button onClick={sendInquiry} style={{ border: "none", background: C.green, color: "#fff", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={17} /></button></div>
        </div>
      )}
    </Modal>
  );
}
function InquiryChat({ q, state, setState }) {
  const [text, setText] = useState("");
  const reply = () => { const t = text.trim(); if (!t) return; setState((s) => ({ ...s, inquiries: (s.inquiries || []).map((x) => x.id === q.id ? { ...x, msgs: [...x.msgs, { id: "iq" + Date.now(), from: "supplier", text: t, ts: Date.now() }], unreadClient: true } : x) })); setText(""); };
  const cur = (state.inquiries || []).find((x) => x.id === q.id) || q;
  return (
    <div>
      <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 10, background: "#F7F9FC", borderRadius: 10, padding: "8px 12px", lineHeight: 1.6 }}>{cur.contact ? cur.contact + " · " : ""}{cur.phone ? cur.phone + " · " : ""}{cur.email}{cur.category ? " · " + cur.category : ""}<br />העסק עוד לא לקוח שלך. כשישלח בקשת הצטרפות — השיחה תעבור אוטומטית לצ'אט הרגיל.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflow: "auto", marginBottom: 12, padding: 4 }}>
        {cur.msgs.map((m) => <div key={m.id} style={{ alignSelf: m.from === "supplier" ? "flex-start" : "flex-end", maxWidth: "82%" }}><div style={{ background: m.from === "supplier" ? C.green : "#EEF1EC", color: m.from === "supplier" ? "#fff" : C.ink, borderRadius: 14, padding: "8px 12px", fontSize: 14 }}>{m.text}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3 }}>{dayStr(m.ts)}</div></div>)}
      </div>
      <div style={{ display: "flex", gap: 8 }}><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && reply()} placeholder="תשובה לעסק…" style={{ ...fieldStyle, flex: 1 }} /><button onClick={reply} style={{ border: "none", background: C.green, color: "#fff", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={17} /></button></div>
    </div>
  );
}
function ClientView({ state, setState, clientId }) {
  const client = state.clients.find((c) => c.id === clientId);
  const [tab, setTab] = useState("home");
  const feat = state.features || {};
  const showPrizes = feat.prizes !== false && hasFeature(state, "prizes");
  const showChat = feat.chat !== false;
  const unread = state.broadcasts.filter((b) => !((client.readBc || []).includes(b.id))).length;
  const tabs = [["home", "בית", Home], ["order", "הזמנה חדשה", ShoppingCart], ["orders", "הזמנות וקבלות", Receipt], showPrizes && ["prizes", "יעדים", Trophy], ["inbox", "תיבת דואר", Mail], showChat && ["chat", "צ'אט עם הספק", MessageSquare]].filter(Boolean);
  return (<div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ inbox: unread }} />
    {tab === "home" && <ClientHome state={state} clientId={clientId} unread={unread} onOpen={setTab} />}
    {tab === "order" && <OrderForm state={state} setState={setState} clientId={clientId} />}
    {tab === "orders" && <ClientOrders state={state} setState={setState} clientId={clientId} canEdit editorRole="client" />}
    {tab === "prizes" && showPrizes && <PrizeLadder state={state} clientId={clientId} />}
    {tab === "inbox" && <Inbox state={state} setState={setState} clientId={clientId} />}
    {tab === "chat" && showChat && <Chat state={state} setState={setState} clientId={clientId} meRole="client" meName={client.name} />}
  </div>);
}
function BrandBadge({ sup, size = 60, accent }) {
  const logo = sup && sup.brand && sup.brand.logo;
  if (logo) return <img src={logo} alt={sup.name} style={{ width: size, height: size, borderRadius: Math.round(size * 0.24), objectFit: "cover", flexShrink: 0, background: "#fff", boxShadow: "0 3px 12px rgba(0,0,0,.14)", border: accent ? "2px solid rgba(255,255,255,.7)" : `1px solid ${C.line}` }} />;
  const ini = ((sup && sup.name) || "?").replace(/[^\u0590-\u05FFA-Za-z0-9 ]/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  const col = (sup && sup.brand && sup.brand.color) || C.greenDeep;
  return <div title={sup && sup.name} style={{ width: size, height: size, borderRadius: Math.round(size * 0.24), flexShrink: 0, background: accent ? "rgba(255,255,255,.95)" : col, color: accent ? col : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: Math.round(size * 0.36), boxShadow: "0 3px 12px rgba(0,0,0,.14)" }}>{ini || "🏪"}</div>;
}
function RoleHome({ name, prompt, cards, onOpen, accent, sup }) {
  const grad = { green: "linear-gradient(135deg,#2FA268,#124A2B)", blue: "linear-gradient(135deg,#3E86B5,#1E5478)", plum: "linear-gradient(135deg,#8B5CB0,#4E2A6B)", amber: "linear-gradient(135deg,#E0A93C,#9A6A16)" };
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: "26px 28px", background: accent ? `linear-gradient(135deg, ${accent}, ${shade(accent)})` : `linear-gradient(120deg, ${C.greenSoft}, #fff 78%)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {sup && <BrandBadge sup={sup} size={64} accent={accent} />}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, color: accent ? "rgba(255,255,255,.85)" : C.sub, fontWeight: 600 }}>שלום,</div>
              <div style={{ fontWeight: 800, fontSize: 25, letterSpacing: "-0.5px", color: accent ? "#fff" : C.ink }}>{name}</div>
              <div style={{ fontSize: 14, color: accent ? "rgba(255,255,255,.9)" : C.sub, marginTop: 4 }}>{prompt || "מה תרצה לעשות היום?"}{sup && sup.name && sup.name !== name ? " · " + sup.name : ""}</div>
            </div>
          </div>
        </div>
      </Panel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {cards.map((c) => { const Ic = c.Icon; const pill = c.stat || c.badge; return (
          <button key={c.id} onClick={() => onOpen(c.id)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 20, overflow: "hidden", padding: 0, background: "#fff", cursor: "pointer", boxShadow: SH }}>
            <div style={{ height: 96, background: grad[c.tone], position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -24, left: -18, width: 84, height: 84, borderRadius: "50%", background: "rgba(255,255,255,.13)" }} />
              <div style={{ position: "absolute", bottom: -30, right: 14, width: 66, height: 66, borderRadius: "50%", background: "rgba(255,255,255,.10)" }} />
              <Ic size={42} color="#fff" strokeWidth={1.8} style={{ position: "relative", opacity: .96 }} />
              {pill && <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,.94)", color: c.tone === "amber" ? "#7A5A17" : C.ink, borderRadius: 20, padding: "3px 10px", fontSize: 11.5, fontWeight: 800 }}>{pill}</span>}
            </div>
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{c.desc}</div>
            </div>
          </button>
        ); })}
      </div>
    </div>
  );
}
function ClientHome({ state, clientId, unread, onOpen }) {
  const client = state.clients.find((c) => c.id === clientId);
  const pts = pointsOf(clientId, state.orders, state.products, state.kgPerPoint, state.periodMonths, state.periodAnchor);
  const debt = outstandingOf(clientId, state.orders, state.products);
  const mo = monthOrdersOf(clientId, state.orders).length;
  const nxt = nextTier(pts, sortTiers(state.prizeTiers));
  const feat = state.features || {};
  const cards = [
    { id: "order", title: "הזמנה חדשה", desc: orderPitch(state), Icon: ShoppingCart, tone: "green" },
    { id: "orders", title: "הזמנות וקבלות", desc: mo ? `${mo} הזמנות החודש` : "היסטוריה וחשבוניות", Icon: Receipt, tone: "blue", badge: debt > 0 ? "חוב " + NIS(debt) : null },
    { id: "prizes", title: "יעדים ופרסים", desc: nxt ? `עוד ${nxt.points - pts} נק' ל${nxt.title}` : "צבור נקודות וזכה בפרסים", Icon: Trophy, tone: "plum", stat: pts + " נק'" },
    { id: "inbox", title: "תיבת דואר", desc: "הודעות ומבצעים", Icon: Mail, tone: "amber", badge: unread ? unread + " חדשות" : null },
    { id: "chat", title: "צ'אט עם הספק", desc: "שאלה? דברו איתנו", Icon: MessageSquare, tone: "green" },
  ];
  const upcoming = state.orders.filter((o) => o.clientId === clientId && o.delivDate && o.delivWindow && o.status !== "delivered").sort((a, b) => new Date(a.delivDate).getTime() - new Date(b.delivDate).getTime())[0];
  const dayLbl = (ds) => { const d = new Date(ds); return isNaN(d.getTime()) ? ds : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); };
  return (
    <div>
      {upcoming && (
        <button onClick={() => onOpen("orders")} style={{ width: "100%", textAlign: "right", border: "none", cursor: "pointer", marginBottom: 16, borderRadius: 16, padding: "14px 18px", background: `linear-gradient(120deg, ${C.green}, ${C.greenDeep})`, color: "#fff", display: "flex", alignItems: "center", gap: 14, boxShadow: SH }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Truck size={24} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>הספק עדכן מועד אספקה 🚚</div>
            <div style={{ fontSize: 13.5, opacity: .95, marginTop: 2 }}>הזמנה #{upcoming.id} תגיע ביום {dayLbl(upcoming.delivDate)}, בין השעות {upcoming.delivWindow}</div>
          </div>
          <ChevronLeft size={20} style={{ opacity: .8 }} />
        </button>
      )}
      <RoleHome sup={state} name={client.name} accent={state.brand && state.brand.color} cards={cards.filter((c) => (c.id !== "prizes" || (feat.prizes !== false && hasFeature(state, "prizes"))) && (c.id !== "chat" || feat.chat !== false))} onOpen={onOpen} />
    </div>
  );
}
function Inbox({ state, setState, clientId }) {
  useEffect(() => {
    const cl = state.clients.find((c) => c.id === clientId);
    const ids = state.broadcasts.map((b) => b.id);
    if (ids.some((id) => !((cl.readBc || []).includes(id)))) setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === clientId ? { ...c, readBc: ids } : c) }));
  }, []);
  const bs = [...state.broadcasts].sort((a, b) => b.ts - a.ts);
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<Mail size={18} />}>תיבת דואר · הודעות ומבצעים</SectionTitle>
      {bs.length === 0 ? <Empty>אין הודעות</Empty> : <div style={{ display: "grid", gap: 10 }}>{bs.map((b) => (
        <div key={b.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, background: "#fff" }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: C.amberSoft, color: C.amber, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Megaphone size={18} /></div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700 }}>{b.text}</div><div style={{ fontSize: 11.5, color: C.sub, marginTop: 3 }}>{dayStr(b.ts)}</div></div>
        </div>
      ))}</div>}
    </Panel>
  );
}

function OrderForm({ state, setState, clientId, agentName }) {
  const [cart, setCart] = useState({}); const [toast, setToast] = useState(""); const [pq, setPq] = useState(""); const [pcat, setPcat] = useState("");
  const minOrder = (state.features && state.features.minOrder) || MIN_ORDER;
  const themeColor = (state.brand && state.brand.color) || C.greenDeep;
  const borderW = (state.brand && state.brand.borderW != null) ? state.brand.borderW : 2.5;
  const setQty = (pid, n) => setCart((c) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(p.stock, (c[pid] || 0) + n)); const nc = { ...c }; if (v === 0) delete nc[pid]; else nc[pid] = v; return nc; });
  const items = Object.entries(cart); const cartons = items.reduce((s, [, n]) => s + n, 0);
  const est = items.reduce((s, [pid, n]) => { const p = state.products.find((x) => x.id === pid); return s + n * cartonPriceGross(p); }, 0);
  const ok = cartons >= minOrder;
  const place = () => { if (!ok) return; const order = { id: String(1000 + Math.floor(Math.random() * 9000)), clientId, date: Date.now(), status: "new", paid: false, items: items.map(([pid, n]) => ({ pid, cartons: n })), byAgent: agentName || null }; setState((s) => ({ ...s, orders: [order, ...s.orders], products: s.products.map((p) => cart[p.id] ? { ...p, stock: Math.max(0, p.stock - cart[p.id]) } : p) })); setCart({}); setToast("ההזמנה נשלחה לליקוט. חשבונית מדויקת תופק אחרי השקילה."); setTimeout(() => setToast(""), 3500); };
  return (
    <>
    <div className="tp-2col" style={{ paddingBottom: cartons > 0 ? 88 : 0 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Package size={18} />} extra={<span style={{ fontSize: 12, color: C.sub }}>מינימום {minOrder} קרטונים</span>}>{orderPitch(state).replace(/^הזמן /, "הזמנת ")}</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={pq} onChange={(e) => setPq(e.target.value)} placeholder="חיפוש מוצר בקטלוג" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
          {(state.cats || []).length > 0 && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>{[["", "הכל"], ...(state.cats || []).map((c) => [c, c])].map(([id, lbl]) => { const on = pcat === id; return <button key={id || "all"} onClick={() => setPcat(id)} style={{ border: `1.5px solid ${on ? themeColor : C.line}`, background: on ? themeColor : "#fff", color: on ? "#fff" : C.sub, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{lbl}</button>; })}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 12 }}>
          {state.products.filter((p) => (!pq.trim() || p.name.toLowerCase().includes(pq.trim().toLowerCase())) && (!pcat || (p.cat || "") === pcat)).map((p) => { const out = p.stock <= 0, low = p.stock > 0 && p.stock <= LOW, inCart = cart[p.id] || 0; return (
            <div key={p.id} style={{ border: `${Math.max(1.5, borderW)}px solid ${inCart > 0 ? themeColor : themeColor + "99"}`, borderRadius: 16, padding: 12, opacity: out ? .55 : 1, background: "#fff", boxShadow: inCart > 0 ? `0 0 0 3px ${themeColor}22` : "none" }}>
              <ProdThumb p={p} tint={themeColor} /><div style={{ fontWeight: 700, marginTop: 8 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: C.sub }}>{isPack(p) ? (p.unit === "unit" ? "לפי יחידה" : "לפי קרטון" + (p.units ? " · " + p.units + " יח\' בקרטון" : "")) : NIS(p.price) + " לק\"ג · קרטון " + p.kg + " ק\"ג"}</div>
              <div style={{ fontWeight: 800, color: themeColor, margin: "5px 0 6px" }}>{noPrice(p) ? <span style={{ fontSize: 13 }}>לפי הצעת מחיר</span> : <>{NIS(cartonPriceGross(p))} <span style={{ fontSize: 11, color: C.sub, fontWeight: 500 }}>/ {packWord(p)}</span></>}</div>
              <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 8, color: out ? C.red : low ? C.amber : C.green }}>{out ? "אזל מהמלאי" : low ? `נותרו ${p.stock}` : "במלאי"}</div>
              {out ? <div style={{ textAlign: "center", fontSize: 12, color: C.sub, padding: "6px 0", border: `1px dashed ${C.line}`, borderRadius: 10 }}>לא זמין</div> : <Stepper value={inCart} onDec={() => setQty(p.id, -1)} onInc={() => setQty(p.id, 1)} maxed={inCart >= p.stock} accent={themeColor} />}
            </div>
          ); })}
        </div>
      </Panel>
      <Panel style={{ alignSelf: "start", boxShadow: SH }}>
        <SectionTitle icon={<ShoppingCart size={18} />}>{agentName ? "הזמנה עבור הלקוח" : "ההזמנה שלך"}</SectionTitle>
        {items.length === 0 ? <div style={{ color: C.sub, fontSize: 14, padding: "8px 0" }}>בחר כמות קרטונים.</div> : (
          <div>{items.map(([pid, n]) => { const p = state.products.find((x) => x.id === pid); return (<div key={pid} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, borderBottom: `1px dashed ${C.line}` }}><span>{p.emoji} {p.name} × {n}</span><span style={{ fontWeight: 700 }}>{noPrice(p) ? "לפי הצעה" : NIS(n * cartonPriceGross(p))}</span></div>); })}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontWeight: 800, fontSize: 17 }}><span>הערכה</span><span style={{ color: themeColor }}>{NIS(est)}</span></div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>הסכום הסופי ייקבע לפי משקל בליקוט.</div></div>
        )}
        {!ok && cartons > 0 && <div style={{ fontSize: 12.5, color: C.amber, marginTop: 8, fontWeight: 600 }}>נדרש מינימום {minOrder} קרטונים (יש {cartons}).</div>}
        <button onClick={place} disabled={!ok} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 12, border: "none", background: ok ? themeColor : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: ok ? "pointer" : "default" }}>שלח הזמנה {cartons > 0 && `· ${cartons} קרטונים`}</button>
        {toast && <div style={{ marginTop: 10, background: C.greenSoft, color: C.greenDeep, padding: 10, borderRadius: 10, fontSize: 13.5, fontWeight: 600, display: "flex", gap: 6, alignItems: "flex-start" }}><Check size={16} /> {toast}</div>}
      </Panel>
    </div>
    {cartons > 0 && (
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "#fff", borderTop: `1px solid ${C.line}`, boxShadow: "0 -6px 20px rgba(0,0,0,.08)", padding: "12px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
          <div><div style={{ fontSize: 12, color: C.sub }}>{cartons} קרטונים · הערכה</div><div style={{ fontWeight: 800, fontSize: 21, color: themeColor }}>{NIS(est)}</div></div>
          <div style={{ flex: 1 }} />
          {!ok && <span style={{ fontSize: 12.5, color: C.amber, fontWeight: 700 }}>מינ' {minOrder} קרטונים</span>}
          <button onClick={place} disabled={!ok} style={{ border: "none", background: ok ? themeColor : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, padding: "12px 26px", borderRadius: 12, cursor: ok ? "pointer" : "default" }}>שלח הזמנה</button>
        </div>
      </div>
    )}
    </>
  );
}

function ClientOrders({ state, setState, clientId, canEdit, editorRole }) {
  const [inv, setInv] = useState(null); const [edit, setEdit] = useState(null); const [of, setOf] = useState("all"); // all | month | debt
  const allOrders = state.orders.filter((o) => o.clientId === clientId).sort((a, b) => b.date - a.date);
  const orders = allOrders.filter((o) => of === "all" || (of === "month" && monthKey(o.date) === nowMonth) || (of === "debt" && o.status === "delivered" && !o.paid));
  const m = monthOrdersOf(clientId, allOrders); const monthTotal = m.reduce((s, o) => s + orderTotal(o, state.products), 0);
  const debt = outstandingOf(clientId, state.orders, state.products);
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
        <Kpi icon={<BarChart3 size={17} />} label={"סה\"כ החודש · " + monthName} value={NIS(monthTotal)} tone="green" onClick={() => { setOf("month"); scrollToId("co-list"); }} active={of === "month"} hint="הזמנות החודש" />
        <Kpi icon={<Wallet size={17} />} label="יתרת חוב לתשלום" value={NIS(debt)} tone={debt > 0 ? "red" : "green"} onClick={() => { setOf("debt"); scrollToId("co-list"); }} active={of === "debt"} hint="מה פתוח לתשלום" />
        <Kpi icon={<Receipt size={17} />} label="הזמנות החודש" value={m.length} tone="blue" onClick={() => { setOf("month"); scrollToId("co-list"); }} active={of === "month"} hint="הצג" />
      </div>
      <Panel style={{ boxShadow: SH }}>
        <span id="co-list" style={{ display: "block", position: "relative", top: -90 }} />
        <SectionTitle icon={<Receipt size={18} />} extra={of !== "all" && <button onClick={() => setOf("all")} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, borderRadius: 20, padding: "5px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{of === "month" ? "החודש" : "לתשלום"} ✕ הצג הכל</button>}>ההזמנות והקבלות שלי</SectionTitle>
        {orders.length === 0 && <Empty>{of === "debt" ? "אין הזמנות פתוחות לתשלום 🎉" : of === "month" ? "אין הזמנות החודש" : "עדיין אין הזמנות"}</Empty>}
        <div style={{ display: "grid", gap: 8 }}>
          {orders.map((o) => { const st = STATUS[o.status]; const editable = canEdit && o.status === "new"; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13, color: C.sub }}>#{o.id} · {dayStr(o.date)}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{st.label}</span></div>
              <div style={{ fontSize: 13, margin: "6px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.emoji}${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              {hasShortage(o) && <div style={{ fontSize: 12.5, color: C.amber, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={13} /> חלק מהפריטים סופקו חלקית — פירוט מלא בחשבונית</div>}
              {o.delivDate && o.delivWindow && <div style={{ fontSize: 12.5, color: C.greenDeep, background: C.greenSoft, borderRadius: 8, padding: "6px 10px", marginBottom: 6, display: "flex", alignItems: "center", gap: 5, fontWeight: 700 }}><Truck size={13} /> אספקה: {(() => { const d = new Date(o.delivDate); return isNaN(d.getTime()) ? o.delivDate : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); })()} · בין {o.delivWindow}</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setInv(o)} style={miniBtn}><Receipt size={13} /> חשבונית</button>
                  {editable && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי הזמנה</button>}
                  {o.status === "delivered" && (o.paid ? <Badge tone="green"><Check size={11} /> שולם</Badge> : <Badge tone="amber">לתשלום מול הספק</Badge>)}
                </div>
                <span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span>
              </div>
            </div>
          ); })}
        </div>
      </Panel>
      {inv && <InvoiceModal order={inv} state={state} onClose={() => setInv(null)} />}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
    </div>
  );
}

function PrizeLadder({ state, clientId }) {
  const client = state.clients.find((c) => c.id === clientId); const tiers = sortTiers(state.prizeTiers);
  const pts = pointsOf(clientId, state.orders, state.products, state.kgPerPoint, state.periodMonths, state.periodAnchor);
  const cur = reachedTier(pts, tiers); const nxt = nextTier(pts, tiers);
  const base = cur ? cur.points : 0; const span = nxt ? nxt.points - base : 1; const barPct = nxt ? Math.min(100, Math.round(((pts - base) / span) * 100)) : 100;
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel pad={0} style={{ overflow: "hidden", boxShadow: SH }}>
        <div style={{ padding: 24, background: `linear-gradient(125deg, ${C.plumSoft} 0%, #fff 70%)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}><div style={{ fontSize: 13, color: C.sub, fontWeight: 600 }}>שלום, {client.name}</div><Badge tone="plum" icon={<RotateCcw size={12} />}>מתאפס בתחילת התקופה · {periodLabel(state.periodMonths, state.periodAnchor)}</Badge></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "6px 0 2px" }}><Star size={28} style={{ color: C.plum }} fill={C.plum} /><span style={{ fontSize: 44, fontWeight: 800, color: C.plum, lineHeight: 1 }}>{NUM(pts)}</span><span style={{ fontSize: 15, color: C.sub, fontWeight: 600 }}>נקודות ({state.kgPerPoint} ק"ג = נקודה)</span></div>
          <div style={{ fontSize: 14, marginTop: 8, fontWeight: 700, color: cur ? C.greenDeep : C.sub }}>{cur ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Trophy size={16} style={{ color: C.amber }} /> זכית עד כה: {cur.title}</span> : "עדיין לא הגעת לפרס הראשון"}</div>
          {nxt && (<><div style={{ background: "#E8DCF0", height: 10, borderRadius: 6, overflow: "hidden", marginTop: 10 }}><div style={{ width: barPct + "%", height: "100%", background: `linear-gradient(90deg, ${C.plum}, #9159b8)` }} /></div><div style={{ fontSize: 13, color: C.sub, marginTop: 6 }}>עוד <b style={{ color: C.plum }}>{nxt.points - pts}</b> נקודות לפרס: <b>{nxt.title}</b>{nxt.detail ? ` · ${nxt.detail}` : ""}</div></>)}
        </div>
      </Panel>
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<Gift size={18} />}>מסלול הפרסים {periodName(state.periodMonths)} · מתאפס ב-{new Date(periodEndMs(state.periodMonths, state.periodAnchor)).toLocaleDateString("he-IL")}</SectionTitle>
        <div style={{ display: "grid", gap: 10 }}>{tiers.map((t) => { const got = pts >= t.points; const isNext = nxt && nxt.id === t.id; return (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${got ? C.green : isNext ? C.plum : C.line}`, background: got ? C.greenSoft : isNext ? C.plumSoft : "#fff", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: got ? C.green : isNext ? C.plum : "#EEF1EC", color: got || isNext ? "#fff" : C.sub }}>{got ? <Check size={20} /> : isNext ? <Trophy size={18} /> : <Lock size={16} />}</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 15 }}>{t.title}</div>{t.detail && <div style={{ fontSize: 12.5, color: C.sub }}>{t.detail}</div>}</div>
            <div style={{ textAlign: "left" }}><div style={{ fontWeight: 800, color: got ? C.greenDeep : isNext ? C.plum : C.sub }}>{t.points} נק'</div><div style={{ fontSize: 11, color: C.sub }}>{got ? "הושג ✓" : `עוד ${t.points - pts}`}</div></div>
          </div>
        ); })}</div>
      </Panel>
    </div>
  );
}

/* ============ EDIT ORDER (client/agent/manager) ============ */
function EditOrder({ order, state, setState, onClose }) {
  const orig = {}; order.items.forEach((it) => { orig[it.pid] = it.cartons; });
  const [qty, setQty] = useState(() => ({ ...orig }));
  const maxFor = (p) => p.stock + (orig[p.id] || 0);
  const setQ = (pid, n) => setQty((q) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(maxFor(p), (q[pid] || 0) + n)); return { ...q, [pid]: v }; });
  const items = Object.entries(qty).filter(([, n]) => n > 0);
  const cartons = items.reduce((s, [, n]) => s + n, 0); const ok = cartons >= MIN_ORDER;
  const est = items.reduce((s, [pid, n]) => { const p = state.products.find((x) => x.id === pid); return s + n * cartonPrice(p); }, 0);
  const save = () => {
    if (!ok) return;
    const newItems = items.map(([pid, n]) => ({ pid, cartons: n }));
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => o.id === order.id ? { ...o, items: newItems } : o),
      products: s.products.map((p) => { const delta = (qty[p.id] || 0) - (orig[p.id] || 0); return delta ? { ...p, stock: Math.max(0, p.stock - delta) } : p; }),
    }));
    onClose();
  };
  return (
    <Modal onClose={onClose} title={"שינוי הזמנה #" + order.id}>
      <div style={{ display: "grid", gap: 8, maxHeight: 380, overflow: "auto" }}>
        {state.products.map((p) => { const out = maxFor(p) <= 0; const v = qty[p.id] || 0; return (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "8px 12px", opacity: out && v === 0 ? .5 : 1 }}>
            <ProdThumb p={p} size={38} /><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div><div style={{ fontSize: 11.5, color: C.sub }}>{NIS(cartonPrice(p))}/קרטון · זמין {maxFor(p)}</div></div>
            <div style={{ width: 118 }}><Stepper value={v} onDec={() => setQ(p.id, -1)} onInc={() => setQ(p.id, 1)} maxed={v >= maxFor(p)} /></div>
          </div>
        ); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontWeight: 800 }}><span>הערכה · {cartons} קרטונים</span><span style={{ color: C.greenDeep, fontSize: 18 }}>{NIS(est)}</span></div>
      {!ok && <div style={{ fontSize: 12.5, color: C.amber, marginTop: 6, fontWeight: 600 }}>מינימום {MIN_ORDER} קרטונים.</div>}
      <button onClick={save} disabled={!ok} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 12, border: "none", background: ok ? C.green : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: ok ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> שמור שינויים</button>
    </Modal>
  );
}

/* ============ MANAGER ============ */
function ManagerView({ state, setState, intent, onIntentDone }) {
  const [tab, setTab] = useState("home"); const [storeSub, setStoreSub] = useState(null);
  const goBilling = () => { setStoreSub("billing" + Date.now()); setTab("mystore"); };
  const go = (t, sub) => { if (t === "mystore" && sub) setStoreSub(sub + Date.now()); else setStoreSub(null); setTab(t); };
  useEffect(() => { if (intent) { if (intent === "subscribe") goBilling(); else setTab(intent); if (onIntentDone) onIntentDone(); } }, [intent]);
  const lowCount = state.products.filter((p) => p.stock <= LOW).length;
  const newCount = state.orders.filter((o) => o.status === "new").length;
  const pendCount = state.clients.filter((c) => c.status === "pending").length;
  const tabs = [["home", "בית", Home], ["orders", "הזמנות", ClipboardList], ["mystore", "החנות שלי", Building2], ["finance", "הכנסות והוצאות", Wallet], ["clients", "לקוחות", Users], ["staff", "צוות", ShieldCheck], ["messages", "הודעות", MessageSquare]];
  const unreadInq = (state.inquiries || []).filter((q) => q.unread).length;
  return (<div><TrialBanner state={state} onPay={goBilling} /><TrialReminder state={state} setState={setState} onPay={goBilling} />{tab === "home" && <OnboardingCard state={state} setState={setState} go={go} />}<Tabs tabs={tabs} active={tab} onChange={(t) => { setStoreSub(null); setTab(t); }} badges={{ orders: newCount, clients: pendCount, messages: unreadInq }} />
    {tab === "home" && <RoleHome sup={state} name="מנהל" prompt="ניהול החנות" cards={[
      { id: "orders", title: "הזמנות", desc: newCount ? `${newCount} לליקוט` : "כל ההזמנות", Icon: ClipboardList, tone: "amber", badge: newCount ? newCount + " חדשות" : null },
      { id: "mystore", title: "החנות שלי", desc: lowCount ? `${lowCount} מוצרים במלאי נמוך` : "מוצרים · עיצוב · יעדים", Icon: Building2, tone: "blue", badge: lowCount ? lowCount + " נמוך" : null },
      { id: "finance", title: "הכנסות והוצאות", desc: "סריקת חשבוניות קנייה · דוח חודשי", Icon: Wallet, tone: "plum", stat: NIS(monthExpenses(state, nowMonth)) },
      { id: "clients", title: "לקוחות", desc: pendCount ? `${pendCount} ממתינים לאישור` : "ניהול לקוחות", Icon: Users, tone: "green", badge: pendCount ? pendCount + " ממתינים" : null },
      { id: "staff", title: "צוות", desc: "מלקטים, נהגים וסוכנים", Icon: ShieldCheck, tone: "blue" },
      { id: "messages", title: "הודעות", desc: "צ'אט ומבצעים ללקוחות", Icon: MessageSquare, tone: "amber" },
    ]} onOpen={setTab} />}
    {tab === "orders" && <MgrOrders state={state} setState={setState} />}
    {tab === "mystore" && <MyStore state={state} setState={setState} initialSub={storeSub ? storeSub.replace(/\d+$/, "") : null} key={storeSub || "ms"} />}
    {tab === "finance" && (hasFeature(state, "finance") ? <FinanceView state={state} setState={setState} /> : <LockedFeature feature="finance" onUpgrade={goBilling} />)}
    {tab === "clients" && <MgrClients state={state} setState={setState} />}
    {tab === "staff" && (hasFeature(state, "staff") ? <MgrStaff state={state} setState={setState} /> : <LockedFeature feature="staff" onUpgrade={goBilling} />)}
    {tab === "messages" && <MgrMessages state={state} setState={setState} />}
  </div>);
}
// המנוי שלי: מצב, השוואת מסלולים, תשלום, בקשת ביטול, חשבוניות
function SupplierInvoices({ state, setState }) {
  const [pv, setPv] = useState(null); const [pay, setPay] = useState(null);
  const sub = state.sub || { plan: "basic", status: "trial", invoices: [] };
  const invs = sub.invoices || [];
  const plan = planOf(sub.plan); const ss = subState(state.sub);
  const [pick, setPick] = useState(plan.id);
  const setSub = (patch) => setState((s) => ({ ...s, sub: { ...(s.sub || {}), ...patch } }));
  const requestCancel = () => { if (!window.confirm("לשלוח בקשה לביטול המנוי? עד שהבקשה תטופל, המנוי ממשיך כרגיל.")) return; setSub({ cancelRequested: Date.now() }); };
  const needPay = ss.st !== "active";
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<CreditCard size={18} />}>המנוי שלי</SectionTitle>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
          <Badge tone={ss.tone}>{ss.label}</Badge><Badge tone={plan.id === "premium" ? "plum" : "blue"}>מסלול {plan.name} · {NIS(plan.price)}/חודש</Badge>
          {sub.method === "credit" && sub.last4 && <Badge><CreditCard size={11} /> ••{sub.last4}</Badge>}
        </div>
        {ss.st === "trial" && <div style={{ background: ss.left <= 7 ? C.redSoft : C.amberSoft, color: ss.left <= 7 ? C.red : "#7A5A17", borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, marginBottom: 12, lineHeight: 1.6 }}>⏳ תקופת הניסיון מסתיימת ב-{new Date(ss.ends).toLocaleDateString("he-IL")} (עוד {ss.left} ימים). כדי להמשיך להשתמש באפליקציה בלי הפסקה — בחרו מסלול ושלמו באשראי. המנוי מתחדש כל חודש עד שתבקשו לבטל.</div>}
        {ss.st === "expired" && <div style={{ background: C.redSoft, color: C.red, borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>תקופת הניסיון הסתיימה. כדי לחזור לעבוד — בחרו מסלול ושלמו.</div>}
        {ss.st === "canceled" && <div style={{ background: C.redSoft, color: C.red, borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 700, marginBottom: 12 }}>המנוי בוטל{sub.canceledAt ? " ב-" + new Date(sub.canceledAt).toLocaleDateString("he-IL") : ""}. אפשר לחדש אותו בכל רגע.</div>}
        {ss.st === "active" && <div style={{ background: C.greenSoft, color: C.greenDeep, borderRadius: 12, padding: "10px 14px", fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>✓ המנוי פעיל ומתחדש אוטומטית כל חודש{sub.method === "credit" ? " בכרטיס האשראי" : ""}.</div>}
        <PlanCompare selected={pick} onSelect={setPick} current={ss.st === "active" ? plan.id : null} />
        {(needPay || pick !== plan.id) && <SubmitBtn onClick={() => setPay(pick)}>{(needPay ? "שלם · מסלול " : "עבור למסלול ") + planOf(pick).name + " · " + planPriceText(planOf(pick))}</SubmitBtn>}
        {(ss.st === "trial" || ss.st === "active") && (sub.cancelRequested
          ? <div style={{ marginTop: 12, fontSize: 13, color: C.red, background: C.redSoft, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>נשלחה בקשת ביטול ב-{new Date(sub.cancelRequested).toLocaleDateString("he-IL")} · המנוי ממשיך עד שהבקשה תטופל.<button onClick={() => setSub({ cancelRequested: null })} style={{ border: "none", background: "transparent", color: C.blue, fontWeight: 700, cursor: "pointer", padding: 0 }}>בטל את הבקשה</button></div>
          : <button onClick={requestCancel} style={{ marginTop: 12, border: "none", background: "transparent", color: C.sub, fontSize: 12.5, textDecoration: "underline", cursor: "pointer", padding: 0 }}>בקשה לביטול המנוי</button>)}
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Receipt size={18} />}>חשבוניות המנוי</SectionTitle>
        {invs.length === 0 ? <Empty>עדיין לא הופקו חשבוניות מנוי</Empty> : <div style={{ display: "grid", gap: 8 }}>{invs.map((iv) => (
          <button key={iv.id} onClick={() => setPv(iv)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: C.greenSoft, color: C.greenDeep, display: "flex", alignItems: "center", justifyContent: "center" }}><Receipt size={18} /></div>
            <div style={{ flex: 1, minWidth: 120 }}><div style={{ fontWeight: 800 }}>חשבונית {iv.month}</div><div style={{ fontSize: 12, color: C.sub }}>{iv.desc || ("מסלול " + iv.planName)} · {new Date(iv.ts).toLocaleDateString("he-IL")}{iv.last4 ? " · ••" + iv.last4 : ""}</div></div>
            {iv.paid ? <Badge tone="green"><Check size={11} /> שולם</Badge> : <Badge tone="amber">ממתין</Badge>}
            <span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(iv.gross)}</span>
          </button>
        ))}</div>}
      </Panel>
      {pv && <SubInvoiceModal iv={pv} sp={state} onClose={() => setPv(null)} />}
      {pay && <CardChargeModal self sups={[state]} sp={state} planId={pay} byName="הספק (תשלום עצמי)" onClose={() => setPay(null)} onCharged={(sp, inv) => setState((s) => ({ ...s, sub: applyCharge(s.sub, inv, true) }))} onPreview={(sp, inv) => { setPay(null); setPv(inv); }} />}
    </div>
  );
}
// מסך נעילה: ניסיון הסתיים / מנוי בוטל
function SubscriptionLock({ state, setState }) {
  const ss = subState(state.sub);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Panel style={{ boxShadow: SH, textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 40 }}>🔒</div>
        <div style={{ fontWeight: 800, fontSize: 22, marginTop: 6 }}>{ss.st === "canceled" ? "המנוי בוטל" : "תקופת הניסיון הסתיימה"}</div>
        <div style={{ fontSize: 14, color: C.sub, marginTop: 6, lineHeight: 1.7 }}>כל הנתונים שלכם שמורים — המוצרים, הלקוחות וההזמנות.<br />בחרו מסלול ושלמו באשראי כדי לחזור לעבוד מיד.</div>
      </Panel>
      <SupplierInvoices state={state} setState={setState} />
    </div>
  );
}
function LockedFeature({ feature, onUpgrade }) {
  const f = PLAN_FEATURES.find((x) => x.id === feature);
  return (
    <Panel style={{ boxShadow: SH, textAlign: "center", padding: 28 }}>
      <div style={{ fontSize: 36 }}>⭐</div>
      <div style={{ fontWeight: 800, fontSize: 19, marginTop: 6 }}>{f ? f.label : "הפיצ'ר"} — במסלול פרימיום</div>
      <div style={{ fontSize: 13.5, color: C.sub, marginTop: 6 }}>המסלול הנוכחי שלכם הוא בסיסי. שדרגו לפרימיום כדי לקבל את כל הכלים.</div>
      <button onClick={onUpgrade} style={{ marginTop: 14, border: "none", background: C.plum, color: "#fff", fontWeight: 800, fontSize: 14.5, padding: "11px 22px", borderRadius: 12, cursor: "pointer" }}>שדרוג לפרימיום</button>
    </Panel>
  );
}
function TrialBanner({ state, onPay }) {
  const ss = subState(state.sub); const sub = state.sub || {};
  if (isDemoSup(state) || !state.sub) return null;
  if (ss.st === "trial") { const hot = ss.left <= 7; return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: hot ? C.redSoft : C.amberSoft, color: hot ? C.red : "#7A5A17", border: `1px solid ${hot ? "#F2C4C4" : "#EED9A6"}`, borderRadius: 14, padding: "10px 14px", marginBottom: 14 }}>
      <span style={{ fontSize: 20 }}>{hot ? "⏰" : "🎁"}</span>
      <div style={{ flex: 1, minWidth: 180, fontSize: 13.5, fontWeight: 700 }}>{hot ? "תקופת הניסיון מסתיימת בעוד " + ss.left + (ss.left === 1 ? " יום!" : " ימים!") : "אתם בחודש ניסיון · עוד " + ss.left + " ימים"}<div style={{ fontWeight: 500, fontSize: 12.5, opacity: .9 }}>{hot ? "כדי להמשיך בלי הפסקה — שלמו באשראי והמנוי יתחדש אוטומטית." : "הניסיון מסתיים ב-" + new Date(ss.ends).toLocaleDateString("he-IL")}</div></div>
      <button onClick={onPay} style={{ border: "none", background: hot ? C.red : C.green, color: "#fff", fontWeight: 800, fontSize: 13.5, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}>{hot ? "שלם והמשך" : "בחר מסלול"}</button>
    </div>); }
  if (sub.cancelRequested && ss.st === "active") return <div style={{ background: C.redSoft, color: C.red, borderRadius: 14, padding: "10px 14px", marginBottom: 14, fontSize: 13.5, fontWeight: 700 }}>נשלחה בקשה לביטול המנוי · המנוי ממשיך עד שהבקשה תטופל</div>;
  return null;
}
// תזכורת קופצת פעם ביום בשבוע האחרון של הניסיון
function TrialReminder({ state, setState, onPay }) {
  const ss = subState(state.sub); const today = new Date().toDateString();
  const due = !isDemoSup(state) && state.sub && ss.st === "trial" && ss.left <= 7 && state.sub.lastReminder !== today;
  const [open, setOpen] = useState(due);
  if (!open) return null;
  const close = () => { setOpen(false); setState((s) => ({ ...s, sub: { ...(s.sub || {}), lastReminder: today } })); };
  return (
    <Modal onClose={close} title="תזכורת: תקופת הניסיון מסתיימת">
      <div style={{ textAlign: "center", padding: "4px 0 10px" }}>
        <div style={{ fontSize: 44 }}>⏰</div>
        <div style={{ fontWeight: 800, fontSize: 20, marginTop: 4 }}>נשארו {ss.left} {ss.left === 1 ? "יום" : "ימים"} לחודש הניסיון</div>
        <div style={{ fontSize: 14, color: C.sub, marginTop: 6, lineHeight: 1.7 }}>הניסיון מסתיים ב-{new Date(ss.ends).toLocaleDateString("he-IL")}. אחרי זה הגישה לאפליקציה תיחסם עד לתשלום.<br />משלמים פעם אחת באשראי — והמנוי מתחדש לבד כל חודש, עד שתבקשו לבטל.</div>
      </div>
      <SubmitBtn onClick={() => { close(); onPay(); }}>לבחירת מסלול ותשלום</SubmitBtn>
      <button onClick={close} style={{ width: "100%", marginTop: 8, border: "none", background: "transparent", color: C.sub, fontWeight: 700, cursor: "pointer", padding: 8 }}>תזכירו לי מחר</button>
    </Modal>
  );
}
function ShareStore({ state, setState }) {
  const markShared = () => { if (setState && !state.sharedAt) setState((s) => ({ ...s, sharedAt: Date.now() })); };
  const [copied, setCopied] = useState(false);
  const storeUrl = (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "") + "?store=" + state.id;
  const copy = () => { markShared(); try { navigator.clipboard.writeText(storeUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} };
  const shareMsg = "בואו להזמין מ" + state.name + " 🛒\n" + storeUrl;
  const shareBtn = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 10, textDecoration: "none", border: "none", cursor: "pointer", fontFamily: "inherit" });
  return (
    <div onClickCapture={(e) => { if (e.target.closest && e.target.closest("a")) markShared(); }}><Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<Send size={18} />}>שיתוף החנות שלך</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>שלח את הקישור ללקוחות — הוא פותח את החנות שלך עם הקטלוג וכפתורי הרשמה/כניסה.</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input readOnly value={storeUrl} onFocus={(e) => e.target.select()} style={{ flex: 1, minWidth: 220, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: "#F7F9F5", color: C.ink, fontFamily: "inherit" }} />
        <button onClick={copy} style={{ border: "none", background: copied ? C.greenDeep : C.green, color: "#fff", fontWeight: 800, padding: "0 20px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>{copied ? <Check size={16} /> : <Download size={16} />}{copied ? "הועתק!" : "העתק קישור"}</button>
      </div>
      <div style={{ fontSize: 13, color: C.sub, margin: "14px 0 8px" }}>שיתוף מהיר:</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#25D366")}><MessageCircle size={16} /> וואטסאפ</a>
        <a href={`mailto:?subject=${encodeURIComponent(state.name)}&body=${encodeURIComponent(shareMsg)}`} style={shareBtn("#5A6B80")}><Mail size={16} /> מייל</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeUrl)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#1877F2")}><Facebook size={16} /> פייסבוק</a>
        <a href={`https://t.me/share/url?url=${encodeURIComponent(storeUrl)}&text=${encodeURIComponent(state.name)}`} target="_blank" rel="noopener noreferrer" style={shareBtn("#229ED9")}><Send size={16} /> טלגרם</a>
        <a href={`sms:?&body=${encodeURIComponent(shareMsg)}`} style={shareBtn("#7A5AF8")}><MessageSquare size={16} /> SMS</a>
        <button onClick={() => { try { if (navigator.share) { navigator.share({ title: state.name, text: shareMsg, url: storeUrl }); } else { copy(); } } catch (e) {} }} style={shareBtn(C.green)}><Share2 size={16} /> עוד…</button>
      </div>
    </Panel></div>
  );
}
function MyStore({ state, setState, initialSub }) {
  const [sub, setSub] = useState(initialSub || "products");
  useEffect(() => { if (initialSub) setSub(initialSub); }, [initialSub]);
  const up = () => setSub("billing");
  const lowCount = state.products.filter((p) => p.stock <= LOW).length;
  const subs = [["products", "מוצרים ומלאי", Boxes], ["design", "עיצוב החנות", ImageIcon], ["share", "שיתוף החנות", Send], ["prizes", "יעדים ופרסים", Gift], ["billing", "המנוי שלי", CreditCard]];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, background: C.surface, border: `1px solid ${C.line}`, borderRadius: 14, padding: 8, boxShadow: SH }}>
        {subs.map(([id, label, Icon]) => { const on = sub === id; return <button key={id} onClick={() => setSub(id)} style={{ display: "flex", alignItems: "center", gap: 7, border: "none", background: on ? C.green : "transparent", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 14, padding: "9px 15px", borderRadius: 10, cursor: "pointer" }}><Icon size={16} />{label}{id === "products" && lowCount ? <span style={{ background: on ? "rgba(255,255,255,.25)" : C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{lowCount}</span> : null}</button>; })}
      </div>
      {sub === "products" && <MgrProducts state={state} setState={setState} />}
      {sub === "design" && (hasFeature(state, "design") ? <StoreDesign state={state} setState={setState} /> : <LockedFeature feature="design" onUpgrade={up} />)}
      {sub === "share" && <ShareStore state={state} setState={setState} />}
      {sub === "prizes" && (hasFeature(state, "prizes") ? <MgrPrizes state={state} setState={setState} /> : <LockedFeature feature="prizes" onUpgrade={up} />)}
      {sub === "billing" && <SupplierInvoices state={state} setState={setState} />}
    </div>
  );
}

function MgrOrders({ state, setState }) {
  const [view, setView] = useState(null); const [edit, setEdit] = useState(null); const [pickOrder, setPickOrder] = useState(null); const [payMark, setPayMark] = useState(null);
  const [filter, setFilter] = useState("new"); const [q, setQ] = useState("");
  const orders = [...state.orders].sort((a, b) => b.date - a.date);
  const drivers = state.staff.filter((s) => hasRole(s, "driver"));
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cnt = {
    new: orders.filter((o) => o.status === "new").length,
    picked: orders.filter((o) => o.status === "picked").length,
    transit: orders.filter((o) => o.status === "assigned" || o.status === "collected").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    today: orders.filter((o) => o.date >= today.getTime()).length,
  };
  const revToday = orders.filter((o) => o.date >= today.getTime()).reduce((s, o) => s + orderTotal(o, state.products), 0);
  const inFilter = (o) => filter === "all" ? true : filter === "new" ? o.status === "new" : filter === "picked" ? o.status === "picked" : filter === "transit" ? (o.status === "assigned" || o.status === "collected") : filter === "delivered" ? o.status === "delivered" : filter === "today" ? o.date >= today.getTime() : true;
  const inSearch = (o) => { if (!q.trim()) return true; const c = state.clients.find((x) => x.id === o.clientId); const hay = (o.id + " " + (c ? c.name : "") + " " + dayStr(o.date)).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const list = orders.filter((o) => inFilter(o) && inSearch(o));
  const assign = (oid, did) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, status: o.status === "new" ? "new" : "assigned", driverId: did } : o) }));
  const markPaid = (oid) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, paid: true } : o) }));
  const slotDayLabel = (ds) => { const d = new Date(ds); return isNaN(d.getTime()) ? ds : d.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "numeric" }); };
  const setSlot = (oid, patch) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, ...patch, delivNotified: false } : o) }));
  const winPart = (o, i) => { const w = o.delivWindow || ""; return w.includes("-") ? w.split("-")[i] : ""; };
  const setWinPart = (o, i, val) => { const from = i === 0 ? val : winPart(o, 0); const to = i === 1 ? val : winPart(o, 1); setSlot(o.id, { delivWindow: (from || to) ? (from + "-" + to) : "" }); };
  const notifyClient = (o) => { const items = o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p ? p.name : ""}×${it.cartons}`; }).join(", "); const text = `עדכון הזמנה #${o.id}: האספקה נקבעה ליום ${slotDayLabel(o.delivDate)}, בין השעות ${o.delivWindow}. פריטים: ${items}. סכום משוער: ${NIS(orderTotal(o, state.products))}.`; setState((s) => ({ ...s, messages: [...s.messages, { id: "m" + Date.now(), clientId: o.clientId, fromRole: "manager", fromName: "מערכת", text, ts: Date.now() }], orders: s.orders.map((x) => x.id === o.id ? { ...x, delivNotified: true } : x) })); };

  const chips = [["new", "לליקוט", cnt.new, "amber"], ["picked", "מוכנות למשלוח", cnt.picked, "blue"], ["transit", "בדרך", cnt.transit, "plum"], ["delivered", "בוצעו", cnt.delivered, "green"], ["today", "מכירות היום", cnt.today, "green"], ["all", "הכל", orders.length, "green"]];
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
        <button onClick={() => setFilter("new")} style={kpiBtn(filter === "new")}><Kpi icon={<AlertTriangle size={17} />} label="לליקוט" value={cnt.new} tone="amber" bare /></button>
        <button onClick={() => setFilter("picked")} style={kpiBtn(filter === "picked")}><Kpi icon={<ClipboardCheck size={17} />} label="מוכנות למשלוח" value={cnt.picked} tone="blue" bare /></button>
        <button onClick={() => setFilter("transit")} style={kpiBtn(filter === "transit")}><Kpi icon={<Truck size={17} />} label="בדרך ללקוח" value={cnt.transit} tone="plum" bare /></button>
        <button onClick={() => setFilter("today")} style={kpiBtn(filter === "today")}><Kpi icon={<Wallet size={17} />} label="מכירות היום" value={NIS(revToday)} tone="green" bare /></button>
      </div>
      <Panel style={{ boxShadow: SH }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {chips.map(([id, lbl, n, tone]) => { const on = filter === id; return <button key={id} onClick={() => setFilter(id)} style={{ border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, borderRadius: 20, padding: "6px 13px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{lbl} <span style={{ opacity: .8 }}>({n})</span></button>; })}
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", minWidth: 200 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: מס' הזמנה / לקוח / תאריך" style={{ border: "none", outline: "none", padding: "8px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        </div>
        {list.length === 0 ? <Empty>אין הזמנות בקטגוריה זו</Empty> : <div style={{ display: "grid", gap: 8 }}>
          {list.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); const st = STATUS[o.status]; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}{o.byAgent && <span style={{ fontSize: 11, color: C.plum, fontWeight: 600 }}> · ע"י {o.byAgent}</span>}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: st.bg, color: st.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{st.label}</span></div>
              <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{dayStr(o.date)} · {o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              {o.pickedBy && <div style={{ fontSize: 12, color: C.sub, marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}><Scale size={12} /> ליקט: {o.pickedBy}</div>}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <Badge tone="green">{orderCartons(o)} קרטונים</Badge>
                {hasShortage(o) && <Badge tone="amber"><AlertTriangle size={11} /> חוסרים</Badge>}
                {o.delivDate && o.delivWindow && <Badge tone="blue"><Clock size={11} /> {slotDayLabel(o.delivDate)} · {o.delivWindow}</Badge>}
                <button onClick={() => setView(o)} style={miniBtn}><Receipt size={13} /> צפייה</button>
                {o.status === "new" && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי</button>}
                {o.status === "delivered" && (o.paid ? <Badge tone="green">שולם</Badge> : <button onClick={() => markPaid(o.id)} style={{ ...miniBtn, color: C.amber, borderColor: C.amber }}><Wallet size={13} /> סמן כשולם</button>)}
                <div style={{ flex: 1 }} /><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span>
              </div>
              {(o.status === "picked" || o.status === "assigned" || o.status === "collected") && (
                <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: C.sub }}>{o.driverId ? "שנה נהג:" : "הצב לנהג:"}</span>
                  {drivers.map((d) => { const on = o.driverId === d.id; return <button key={d.id} onClick={() => assign(o.id, d.id)} style={{ border: `1px solid ${C.plum}`, color: on ? "#fff" : C.plum, background: on ? C.plum : C.plumSoft, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{d.name}</button>; })}
                </div>
              )}
              {o.status === "new" && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => setPickOrder(o)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 13.5, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Scale size={15} /> לקט ושקול הזמנה</button>
                </div>
              )}
              {o.status !== "delivered" && (
                <div style={{ marginTop: 8, borderTop: `1px dashed ${C.line}`, paddingTop: 8, display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                  <label style={{ fontSize: 11, color: C.sub }}>יום אספקה<br /><input type="date" value={o.delivDate || ""} onChange={(e) => setSlot(o.id, { delivDate: e.target.value })} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit", marginTop: 3 }} /></label>
                  <div style={{ fontSize: 11, color: C.sub }}>טווח שעות<div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}><input type="time" value={winPart(o, 0)} onChange={(e) => setWinPart(o, 0, e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit" }} /><span style={{ color: C.sub }}>עד</span><input type="time" value={winPart(o, 1)} onChange={(e) => setWinPart(o, 1, e.target.value)} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 8px", fontSize: 13, fontFamily: "inherit" }} /></div></div>
                  <button onClick={() => notifyClient(o)} disabled={!o.delivDate || !(o.delivWindow && o.delivWindow.split("-")[0] && o.delivWindow.split("-")[1])} style={{ border: "none", background: (o.delivDate && o.delivWindow && o.delivWindow.split("-")[0] && o.delivWindow.split("-")[1]) ? C.green : "#C9D3C7", color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Send size={14} /> עדכן לקוח</button>
                  {o.delivNotified && <Badge tone="green"><Check size={11} /> הלקוח עודכן</Badge>}
                </div>
              )}
            </div>
          ); })}
        </div>}
      </Panel>
      {view && <InvoiceModal order={view} state={state} onClose={() => setView(null)} withAddress />}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
      {pickOrder && <PickModal order={pickOrder} state={state} setState={setState} me={{ name: state.name || "מנהל" }} onClose={() => setPickOrder(null)} />}
      {payMark && <PayMarkModal order={payMark} state={state} setState={setState} onClose={() => setPayMark(null)} />}
    </div>
  );
}

/* ============ PURCHASE INVOICES · EXPENSES & INCOME ============ */
const PINV_KEY = (id) => KEY + ":pinv:" + id; // תמונת החשבונית נשמרת בנפרד כדי לא להכביד על הנתונים הראשיים
const monthLabelOf = (mk) => { const [y, m] = mk.split("-").map(Number); return new Date(y, m, 1).toLocaleDateString("he-IL", { month: "long", year: "numeric" }); };
const lastMonths = (n) => { const out = []; const d = new Date(); for (let i = 0; i < n; i++) { out.push(monthKey(new Date(d.getFullYear(), d.getMonth() - i, 1))); } return out; };
const pinvDate = (iv) => { const d = iv.date ? new Date(iv.date) : null; return d && !isNaN(d.getTime()) ? d.getTime() : iv.ts; };
const pinvTotal = (iv) => iv.total != null ? iv.total : 0;
const monthIncome = (state, mk) => state.orders.filter((o) => monthKey(o.date) === mk).reduce((s, o) => s + orderTotal(o, state.products), 0);
const monthInvoices = (state, mk) => (state.purchaseInvoices || []).filter((iv) => monthKey(pinvDate(iv)) === mk).sort((a, b) => pinvDate(b) - pinvDate(a));
const monthExpenses = (state, mk) => monthInvoices(state, mk).reduce((s, iv) => s + pinvTotal(iv), 0);
const normName = (t) => (t || "").replace(/["'״׳().,\-]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
const guessMatch = (name, products) => { const n = normName(name); if (!n) return "new"; const exact = products.find((p) => normName(p.name) === n); if (exact) return exact.id; const part = products.find((p) => { const pn = normName(p.name); return pn.length > 2 && (n.includes(pn) || pn.includes(n)); }); return part ? part.id : "new"; };
const compressImage = (file, maxW, q) => new Promise((res, rej) => { const r = new FileReader(); r.onerror = rej; r.onload = () => { const im = new Image(); im.onerror = rej; im.onload = () => { const sc = Math.min(1, maxW / Math.max(im.width, im.height)); const cv = document.createElement("canvas"); cv.width = Math.round(im.width * sc); cv.height = Math.round(im.height * sc); const cx = cv.getContext("2d"); cx.fillStyle = "#fff"; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(im, 0, 0, cv.width, cv.height); res(cv.toDataURL("image/jpeg", q)); }; im.src = r.result; }; r.readAsDataURL(file); });
const fileToDataUrl = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onerror = rej; r.onload = () => res(r.result); r.readAsDataURL(file); });
// ---- סריקת חשבונית: עמיד לגרשיים בעברית, לחשבוניות ארוכות ולשגיאות שירות ----
const SCAN_PROMPT = 'זו חשבונית קנייה של סחורה (בדרך כלל בעברית). חלץ ממנה את הנתונים והחזר JSON בלבד, בלי טקסט נוסף ובלי ```. מבנה: {"s":"שם הספק שהנפיק את החשבונית","n":"מספר חשבונית","d":"YYYY-MM-DD","v":סכום_מעמ_או_null,"t":סהכ_לתשלום_או_null,"i":[["שם מוצר",כמות,"יחידה",מחיר_ליחידה_לפני_מעמ_ולפני_הנחה,אחוז_הנחה]]}. חוקים: יחידה היא "קג" אם נמכר לפי משקל, "קרטון" אם נמכר בקרטון/ארגז/מארז/חבילה, אחרת "יח" (יחידה בודדת). אם אין הנחה — 0. מספרים ללא סימני מטבע וללא פסיקים. בתוך טקסט אל תשתמש במרכאות " — כתוב ״ במקום (למשל ק״ג, בע״מ). שמות מוצרים קצרים. אם שדה לא קריא — null.';
const heQuoteFix = (x) => x.replace(/([\u0590-\u05FF])"([\u0590-\u05FF])/g, "$1״$2");
function parseScan(txt) {
  const t = heQuoteFix(String(txt || "").replace(/```json|```/g, "").trim());
  const m = t.match(/\{[\s\S]*\}/);
  if (m) { try { const j = JSON.parse(m[0]); return { ...j, i: Array.isArray(j.i) ? j.i : [], complete: true }; } catch (e) {} }
  // שחזור חלקי (למשל תשובה שנקטעה באמצע)
  const str = (k) => { const r = t.match(new RegExp('"' + k + '"\\s*:\\s*"([^"]*)"')); if (r) return r[1]; const q = t.match(new RegExp('"' + k + '"\\s*:\\s*(-?[\\d.]+)')); return q ? q[1] : null; };
  const num = (k) => { const r = t.match(new RegExp('"' + k + '"\\s*:\\s*(-?[\\d.]+)')); return r ? +r[1] : null; };
  const nv = (x) => (x == null || x === "null" ? null : +x);
  const rows = []; const re = /\[\s*"([^"]*)"\s*,\s*(-?[\d.]+|null)\s*,\s*"([^"]*)"\s*,\s*(-?[\d.]+|null)\s*,\s*(-?[\d.]+|null)\s*\]/g; let r;
  while ((r = re.exec(t))) rows.push([r[1], nv(r[2]), r[3], nv(r[4]), nv(r[5]) || 0]);
  return { s: str("s"), n: str("n"), d: str("d"), v: num("v"), t: num("t"), i: rows, complete: false };
}
// בתוך Claude: פנייה ישירה. באתר עצמאי (Render וכו'): דרך השרת שלנו ב-/api/claude, שמחזיק את מפתח ה-API
const IN_CLAUDE = (() => { try { return /claude\.ai$|claudeusercontent\.com$|anthropic\.com$/.test(window.location.hostname); } catch (e) { return false; } })();
const AI_ENDPOINT = (typeof window !== "undefined" && window.B2B_AI_ENDPOINT) || (IN_CLAUDE ? "https://api.anthropic.com/v1/messages" : "/api/claude");
async function callClaude(content) {
  let res;
  try { res = await fetch(AI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content }] }) }); }
  catch (e) { const er = new Error("NETWORK"); er.code = "network"; throw er; }
  let d = null; try { d = await res.json(); } catch (e) {}
  if (!res.ok || !d || d.type === "error") { const er = new Error((d && d.error && d.error.message) || ("HTTP " + res.status)); er.code = res.status === 413 ? "too_big" : res.status === 429 ? "busy" : res.status === 529 ? "busy" : (res.status === 404 || res.status === 405) && !IN_CLAUDE ? "no_server" : (d && d.error && d.error.type === "config") ? "no_key" : "api"; throw er; }
  return { text: (d.content || []).map((c) => c.type === "text" ? c.text : "").join("\n"), stop: d.stop_reason };
}
const toBlock = (dataUrl) => { const media = dataUrl.slice(5, dataUrl.indexOf(";")); const data = dataUrl.split(",")[1]; return media === "application/pdf" ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } } : { type: "image", source: { type: "base64", media_type: media, data } }; };
// מקבל דף אחד או כמה דפים של אותה חשבונית (תמונות ו/או PDF), לפי הסדר
async function aiScanInvoice(pagesIn, onProgress) {
  const pages = Array.isArray(pagesIn) ? pagesIn : [pagesIn];
  const blocks = pages.map(toBlock);
  const multi = pages.length > 1 ? "החשבונית מורכבת מ-" + pages.length + " דפים שמצורפים לפי הסדר — זו חשבונית אחת. אחד את כל שורות המוצרים מכל הדפים לרשימה אחת, בלי כפילויות, ואל תכלול שורות של סיכום ביניים / העברה מדף קודם כמוצרים. הסכומים הכוללים נמצאים בדרך כלל בדף האחרון. " : "";
  const src = blocks.length === 1 ? blocks[0] : null;
  const first = await callClaude([...blocks, { type: "text", text: multi + SCAN_PROMPT }]);
  const out = parseScan(first.text);
  let stop = first.stop, guard = 0;
  // חשבונית ארוכה: התשובה נקטעה — מבקשים את המשך השורות
  while ((stop === "max_tokens" || !out.complete) && out.i.length > 0 && guard < 4) {
    guard++; if (onProgress) onProgress(out.i.length);
    const last = out.i[out.i.length - 1][0];
    const more = await callClaude([...blocks, { type: "text", text: 'מאותה חשבונית' + (pages.length > 1 ? " (" + pages.length + " דפים)" : "") + ': כבר נקלטו ' + out.i.length + ' שורות המוצרים הראשונות (האחרונה: "' + last + '"). החזר JSON בלבד במבנה {"i":[["שם מוצר",כמות,"יחידה",מחיר,הנחה]]} עם השורות שאחריה בלבד, באותם חוקים: יחידה "קג", "קרטון" או "יח", בלי מרכאות " בתוך טקסט (כתוב ״). אם אין עוד שורות — {"i":[]}.' }]);
    const p = parseScan(more.text); stop = more.stop;
    const fresh = p.i.filter((row) => !out.i.some((x) => x[0] === row[0] && x[1] === row[1] && x[3] === row[3]));
    if (!fresh.length) break;
    out.i = out.i.concat(fresh); out.complete = p.complete;
  }
  return out;
}
const scanErrorText = (e) => {
  const c = e && e.code;
  if (c === "network") return IN_CLAUDE ? "אין חיבור לשירות הסריקה. בדקו את החיבור לאינטרנט ונסו שוב." : "אין חיבור לשרת הסריקה. בדקו את החיבור לאינטרנט, או שהשרת באתר (server.js) פועל.";
  if (c === "no_server") return "שרת הסריקה לא מותקן באתר: חסר הנתיב /api/claude. יש להעלות את server.js ולהגדיר את האתר ב-Render כ-Web Service.";
  if (c === "no_key") return "חסר מפתח API בשרת: יש להגדיר ב-Render משתנה סביבה ANTHROPIC_API_KEY.";
  if (c === "busy") return "שירות הסריקה עמוס כרגע. נסו שוב בעוד דקה.";
  if (c === "too_big") return "הקובץ גדול מדי לסריקה. נסו צילום רגיל של החשבונית או PDF קטן יותר.";
  if (c === "api") return "שירות הסריקה החזיר שגיאה: " + (e.message || "") ;
  return "לא הצלחנו לפענח את החשבונית. נסו צילום חד וישר, באור טוב, שבו כל החשבונית בתוך המסגרת.";
};

function PurchaseScanModal({ state, setState, onClose }) {
  const cats = state.cats || [];
  const today = new Date().toISOString().slice(0, 10);
  const blank = () => ({ add: true, name: "", match: "new", qty: "", unit: "carton", kg: 1, buy: "", disc: 0, sell: "", cat: "" });
  const [pages, setPages] = useState([]); // [{ id, preview, store, ai, type, name }] — כל דף של החשבונית
  const [scan, setScan] = useState("idle"); const [scanErr, setScanErr] = useState(""); const [scanMsg, setScanMsg] = useState(""); const [adding, setAdding] = useState(false);
  const MAX_PAGES = 10;
  const [h, setH] = useState({ supplier: "", number: "", date: today, vat: "" });
  const [rows, setRows] = useState([blank()]);
  const [markup, setMarkup] = useState(30); const [sellVatIncl, setSellVatIncl] = useState(false);
  const [err, setErr] = useState(""); const [saving, setSaving] = useState(false);
  const setRow = (i, k, v) => setRows((rs) => rs.map((r, j) => j === i ? { ...r, [k]: v, ...(k === "unit" ? { kg: v === "weight" ? 10 : 1 } : {}), ...(k === "name" && r.match === "new" ? {} : {}) } : r));
  const netOf = (r) => (+r.buy || 0) * (1 - Math.min(100, Math.max(0, +r.disc || 0)) / 100);
  const subtotal = rows.reduce((s, r) => s + (+r.qty || 0) * netOf(r), 0);
  const vat = h.vat === "" ? subtotal * VAT : (+h.vat || 0);
  const total = subtotal + vat;
  const applyMarkup = () => setRows((rs) => rs.map((r) => netOf(r) > 0 ? { ...r, sell: String(Math.round(netOf(r) * (1 + markup / 100) * 100) / 100) } : r));
  const runScan = async (list) => {
    const ps = (list || pages).map((pg) => pg.ai).filter(Boolean); if (!ps.length) return;
    setScan("busy"); setScanErr(""); setScanMsg(ps.length > 1 ? "קורא " + ps.length + " דפים… זה לוקח כמה שניות" : "");
    try {
      const j = await aiScanInvoice(ps, (n) => setScanMsg("חשבונית ארוכה — נקראו " + n + " שורות, ממשיך לקרוא…"));
      const items = Array.isArray(j.i) ? j.i : [];
      setH((x) => ({ supplier: j.s || x.supplier, number: j.n != null ? String(j.n) : x.number, date: (j.d && /^\d{4}-\d{2}-\d{2}$/.test(j.d)) ? j.d : x.date, vat: j.v != null && !isNaN(+j.v) ? String(j.v) : "" }));
      if (items.length) setRows(items.map((it) => { const [name, qty, unit, price, disc] = Array.isArray(it) ? it : [it.name, it.qty, it.unit, it.price, it.disc]; const us = String(unit || ""); const w = /ק.?ג|kg|קילו/i.test(us); const ut = w ? "weight" : /קרטון|ארגז|מארז|חבילה|carton|box|ctn/i.test(us) ? "carton" : "unit"; const nm = String(name || "").trim(); const buy = +price || 0; return { add: true, name: nm, match: guessMatch(nm, state.products), qty: qty != null ? String(qty) : "", unit: ut, kg: w ? 10 : 1, buy: buy ? String(buy) : "", disc: +disc || 0, sell: buy ? String(Math.round(buy * (1 - (+disc || 0) / 100) * (1 + markup / 100) * 100) / 100) : "", cat: "" }; }));
      setScan(items.length ? "done" : "empty");
    } catch (e) { setScan("error"); setScanErr(scanErrorText(e)); try { console.error("invoice scan failed", e); } catch (x) {} }
  };
  // הוספת דפים: מצלמה (דף אחד בכל פעם) או גלריה/קבצים (כמה בבת אחת)
  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []); if (!files.length) return; setErr("");
    const room = MAX_PAGES - pages.length; if (room <= 0) return setErr("אפשר עד " + MAX_PAGES + " דפים לחשבונית אחת");
    setAdding(true); const added = [];
    for (const f of files.slice(0, room)) {
      try {
        if (f.type === "application/pdf") { const du = await fileToDataUrl(f); added.push({ id: "pg" + Date.now() + added.length, preview: "", store: f.size < 900000 ? du : "", ai: du, type: "pdf", name: f.name }); }
        else { const many = pages.length + files.length > 3; const big = await compressImage(f, many ? 1400 : 1600, many ? 0.75 : 0.82); const small = await compressImage(f, 1000, 0.6); added.push({ id: "pg" + Date.now() + added.length, preview: small, store: small, ai: big, type: "img", name: f.name }); }
      } catch (e) { setErr("לא ניתן לפתוח את הקובץ " + (f.name || "") + ". נסו תמונה (JPG/PNG) או PDF."); }
    }
    if (files.length > room) setErr("נוספו " + room + " דפים — המקסימום הוא " + MAX_PAGES + " לחשבונית");
    setAdding(false);
    if (added.length) { setPages((cur) => [...cur, ...added]); if (scan !== "idle") setScan("stale"); }
  };
  const removePage = (id) => { setPages((cur) => cur.filter((x) => x.id !== id)); if (scan !== "idle") setScan("stale"); };
  const movePage = (idx, d) => setPages((cur) => { const a = [...cur]; const t = idx + d; if (t < 0 || t >= a.length) return a; [a[idx], a[t]] = [a[t], a[idx]]; return a; });
  const valid = rows.filter((r) => r.name.trim());
  const toStore = valid.filter((r) => r.add);
  const dup = h.number.trim() && (state.purchaseInvoices || []).some((iv) => iv.number && iv.number === h.number.trim() && normName(iv.supplier) === normName(h.supplier));
  const save = async () => {
    if (!h.supplier.trim()) return setErr("נא למלא את שם הספק שממנו קנית");
    if (!valid.length) return setErr("נא להוסיף לפחות שורת מוצר אחת");
    setSaving(true);
    const now = Date.now(); const id = "pi" + now;
    const items = valid.map((r) => { const qty = +r.qty || 0; const net = netOf(r); return { name: r.name.trim(), qty, unit: r.unit, kg: Math.max(0.1, +r.kg || 1), buy: +r.buy || 0, disc: +r.disc || 0, net, total: qty * net, sell: +r.sell || 0, added: !!r.add, match: r.match }; });
    const rec = { id, ts: now, date: h.date || today, supplier: h.supplier.trim(), number: h.number.trim(), items, subtotal, vat, total, pages: [], count: toStore.length };
    let n = 0;
    for (const pg of pages) { if (!pg.store) continue; try { await window.storage.set(PINV_KEY(id) + ":" + n, pg.store); rec.pages.push({ type: pg.type, name: pg.name }); n++; } catch (e) {} }
    rec.hasFile = n > 0;
    setState((s) => {
      let products = [...s.products];
      items.forEach((it, i) => {
        if (!it.added) return;
        const cartonsIn = isPack(it) ? Math.round(it.qty) : Math.max(1, Math.round(it.qty / it.kg));
        const costKg = isPack(it) ? it.net / it.kg : it.net;
        const priceKg = it.sell > 0 ? (isPack(it) ? it.sell / it.kg : it.sell) : null;
        const ex = it.match !== "new" ? products.find((p) => p.id === it.match) : null;
        if (ex) products = products.map((p) => p.id === ex.id ? { ...p, stock: (p.stock || 0) + cartonsIn, cost: costKg, ...(priceKg != null ? { price: priceKg, noPrice: false, vatIncluded: sellVatIncl } : {}) } : p);
        else products.push({ id: "p" + now + "_" + i, name: it.name, unit: it.unit, kg: it.kg, units: 0, cost: costKg, price: priceKg || 0, noPrice: priceKg == null, vatIncluded: sellVatIncl, stock: cartonsIn, emoji: "📦", img: "", cat: valid[i].cat || "", fromInvoice: id });
      });
      return { ...s, products, purchaseInvoices: [rec, ...(s.purchaseInvoices || [])] };
    });
    setSaving(false); onClose(rec);
  };
  const inp = { border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 8px", fontSize: 13, fontFamily: "inherit", width: "100%", boxSizing: "border-box", background: "#fff" };
  const lab = (t) => <div style={{ fontSize: 11, color: C.sub, marginBottom: 2 }}>{t}</div>;
  return (
    <Modal onClose={onClose} title="סריקת חשבונית קנייה">
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 12, lineHeight: 1.6 }}>צלמו או העלו את החשבונית מהספק שלכם — גם אם היא כמה דפים: מוסיפים את כל הדפים ואז לוחצים "סרוק". המערכת תקרא את שם הספק, מספר החשבונית והמוצרים — אתם בודקים, קובעים מחיר מכירה, והמוצרים עולים ישר לחנות. החשבונית נשמרת בהוצאות החודש.</div>
      {pages.length > 0 && (
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 8, marginBottom: 8, background: "#F7F9FC" }}>
          <div style={{ fontSize: 12.5, color: C.sub, fontWeight: 700, marginBottom: 6 }}>דפי החשבונית ({pages.length}) — לפי הסדר</div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {pages.map((pg, idx) => (
              <div key={pg.id} style={{ position: "relative", flexShrink: 0, width: 96, border: `1px solid ${C.line}`, borderRadius: 10, background: "#fff", padding: 4, textAlign: "center" }}>
                {pg.preview ? <img src={pg.preview} alt={"דף " + (idx + 1)} style={{ width: 86, height: 110, objectFit: "cover", borderRadius: 6, display: "block" }} /> : <div style={{ width: 86, height: 110, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: C.sub, fontSize: 11 }}><FileText size={26} />PDF</div>}
                <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 3 }}>דף {idx + 1}</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 3 }}>
                  <button onClick={() => movePage(idx, -1)} disabled={idx === 0} title="הזז קדימה" style={{ border: `1px solid ${C.line}`, background: "#fff", borderRadius: 6, width: 24, height: 22, cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? .35 : 1, fontSize: 12, padding: 0 }}>→</button>
                  <button onClick={() => movePage(idx, 1)} disabled={idx === pages.length - 1} title="הזז אחורה" style={{ border: `1px solid ${C.line}`, background: "#fff", borderRadius: 6, width: 24, height: 22, cursor: idx === pages.length - 1 ? "default" : "pointer", opacity: idx === pages.length - 1 ? .35 : 1, fontSize: 12, padding: 0 }}>←</button>
                </div>
                <button onClick={() => removePage(pg.id)} title="הסר דף" style={{ position: "absolute", top: -6, left: -6, width: 22, height: 22, borderRadius: "50%", border: "none", background: C.red, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}><X size={13} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, border: `1.5px dashed ${C.green}`, borderRadius: 12, padding: pages.length ? 10 : 18, cursor: "pointer", color: C.greenDeep, fontWeight: 700, fontSize: 14, background: C.greenSoft + "66", textAlign: "center" }}>
          <ImageIcon size={22} />{pages.length ? "צלם דף נוסף" : "צלם חשבונית"}
          {!pages.length && <span style={{ fontSize: 11.5, fontWeight: 500, color: C.sub }}>כמה דפים? מצלמים אחד אחרי השני</span>}
          <input type="file" accept="image/*" capture="environment" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} style={{ display: "none" }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, border: `1.5px dashed ${C.blue}`, borderRadius: 12, padding: pages.length ? 10 : 18, cursor: "pointer", color: C.blue, fontWeight: 700, fontSize: 14, background: C.blueSoft + "66", textAlign: "center" }}>
          <Paperclip size={22} />{pages.length ? "הוסף דפים מהטלפון" : "העלה מהטלפון"}
          <span style={{ fontSize: 11.5, fontWeight: 500, color: C.sub }}>אפשר לבחור כמה תמונות · PDF</span>
          <input type="file" multiple accept="image/*,application/pdf" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} style={{ display: "none" }} />
        </label>
      </div>
      {adding && <div style={{ fontSize: 13, color: C.sub, marginBottom: 8 }}>מכין את הדפים…</div>}
      {pages.length > 0 && scan !== "busy" && (scan === "idle" || scan === "stale") && <button onClick={() => runScan()} style={{ width: "100%", marginBottom: 12, padding: 12, borderRadius: 12, border: "none", background: C.blue, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Search size={17} /> {scan === "stale" ? "סרוק מחדש את " : "סרוק את "}{pages.length === 1 ? "החשבונית" : pages.length + " הדפים"}</button>}
      {scan === "stale" && <div style={{ fontSize: 12.5, color: C.amber, marginTop: -6, marginBottom: 10, textAlign: "center" }}>הדפים השתנו אחרי הסריקה — לחצו לסריקה מחדש (הנתונים הנוכחיים יוחלפו)</div>}
      {scan === "busy" && <div style={{ background: C.blueSoft, color: C.blue, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Search size={16} /> {scanMsg || "קורא את החשבונית… זה לוקח כמה שניות"}</div>}
      {scan === "done" && <div style={{ background: C.greenSoft, color: C.greenDeep, borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 600, marginBottom: 12 }}>✓ נקראו {rows.length} שורות. בדקו את הנתונים — הסריקה האוטומטית עלולה לטעות.</div>}
      {(scan === "error" || scan === "empty") && <div style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "10px 12px", fontSize: 13, marginBottom: 12 }}>{scan === "empty" ? "לא זוהו שורות מוצרים. אפשר למלא ידנית." : scanErr} {pages.length > 0 && <button onClick={() => runScan()} style={{ border: "none", background: "transparent", color: C.blue, fontWeight: 700, cursor: "pointer", padding: 0 }}>נסה שוב</button>}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8, marginBottom: 12 }}>
        <label>{lab("שם הספק שממנו קניתי *")}<input value={h.supplier} onChange={(e) => setH({ ...h, supplier: e.target.value })} style={inp} /></label>
        <label>{lab("מספר חשבונית")}<input value={h.number} onChange={(e) => setH({ ...h, number: e.target.value })} style={inp} /></label>
        <label>{lab("תאריך החשבונית")}<input type="date" value={h.date} onChange={(e) => setH({ ...h, date: e.target.value })} style={inp} /></label>
      </div>
      {dup && <div style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 12.5, marginBottom: 10 }}>⚠️ חשבונית עם אותו מספר מאותו ספק כבר נשמרה. ודאו שזו לא כפילות.</div>}

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: "#F7F9FC", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>מחיר מכירה = עלות +</span>
        <input type="number" value={markup} onChange={(e) => setMarkup(Math.max(0, +e.target.value))} style={{ ...inp, width: 66, textAlign: "center" }} /><span style={{ fontSize: 13 }}>%</span>
        <button onClick={applyMarkup} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "7px 12px", borderRadius: 8, cursor: "pointer" }}>החל על כל השורות</button>
        <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: C.sub, marginInlineStart: "auto" }}><input type="checkbox" checked={sellVatIncl} onChange={(e) => setSellVatIncl(e.target.checked)} /> מחירי המכירה כוללים מע"מ</label>
      </div>

      <div style={{ display: "grid", gap: 10, maxHeight: 380, overflow: "auto" }}>
        {rows.map((r, i) => { const n = netOf(r); const lt = (+r.qty || 0) * n; const margin = (+r.sell || 0) - n; const u = r.unit === "weight" ? 'לק"ג' : r.unit === "unit" ? "ליחידה" : "לקרטון"; return (
          <div key={i} style={{ border: `1px solid ${r.add ? C.line : "#EEE"}`, borderRadius: 12, padding: 10, background: r.add ? "#fff" : "#FAFAFA" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <input type="checkbox" checked={r.add} onChange={(e) => setRow(i, "add", e.target.checked)} title="להעלות לחנות" />
              <input value={r.name} onChange={(e) => setRow(i, "name", e.target.value)} onBlur={() => r.match === "new" && setRow(i, "match", guessMatch(r.name, state.products))} placeholder={"שם מוצר " + (i + 1)} style={{ ...inp, fontWeight: 700 }} />
              <button onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(92px,1fr))", gap: 6 }}>
              <label>{lab("בחנות")}<select value={r.match} onChange={(e) => setRow(i, "match", e.target.value)} style={inp}><option value="new">מוצר חדש</option>{state.products.map((p) => <option key={p.id} value={p.id}>הוסף ל: {p.name}</option>)}</select></label>
              <label>{lab("יחידה")}<select value={r.unit} onChange={(e) => setRow(i, "unit", e.target.value)} style={inp}><option value="carton">קרטון</option><option value="unit">יחידה</option><option value="weight">ק"ג</option></select></label>
              <label>{lab(r.unit === "weight" ? 'כמות (ק"ג)' : r.unit === "unit" ? "כמות (יחידות)" : "כמות (קרטונים)")}<input type="number" value={r.qty} onChange={(e) => setRow(i, "qty", e.target.value)} style={inp} /></label>
              {r.unit === "weight" && <label>{lab('ק"ג בקרטון')}<input type="number" value={r.kg} onChange={(e) => setRow(i, "kg", e.target.value)} style={inp} /></label>}
              <label>{lab("מחיר קנייה " + u)}<input type="number" value={r.buy} onChange={(e) => setRow(i, "buy", e.target.value)} style={inp} /></label>
              <label>{lab("הנחה %")}<input type="number" value={r.disc} onChange={(e) => setRow(i, "disc", e.target.value)} style={inp} /></label>
              <label>{lab("מחיר מכירה " + u)}<input type="number" value={r.sell} onChange={(e) => setRow(i, "sell", e.target.value)} placeholder="לקביעתך" style={{ ...inp, borderColor: C.green }} /></label>
              {r.match === "new" && <label>{lab("קטגוריה")}<select value={r.cat} onChange={(e) => setRow(i, "cat", e.target.value)} style={inp}><option value="">ללא</option>{cats.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12, color: C.sub, marginTop: 6 }}><span>עלות נטו: <b style={{ color: C.ink }}>{NIS(n)}</b></span><span>סה"כ שורה: <b style={{ color: C.ink }}>{NIS(lt)}</b></span>{+r.sell > 0 && <span>רווח ליחידה: <b style={{ color: margin > 0 ? C.greenDeep : C.red }}>{NIS(margin)}</b></span>}{r.add && <span style={{ color: C.greenDeep, fontWeight: 700 }}>{r.match === "new" ? "→ מוצר חדש בחנות" : "→ יתווסף למלאי הקיים"}</span>}</div>
          </div>
        ); })}
      </div>
      <button onClick={() => setRows((rs) => [...rs, blank()])} style={{ marginTop: 10, border: `1px solid ${C.line}`, background: "#fff", color: C.green, fontWeight: 700, fontSize: 13, padding: "8px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Plus size={15} /> הוסף שורה</button>

      <div style={{ marginInlineStart: "auto", maxWidth: 300, marginTop: 12, fontSize: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span>סכום לפני מע"מ</span><b>{NIS(subtotal)}</b></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, gap: 8 }}><span>מע"מ</span><input type="number" value={h.vat === "" ? Math.round(subtotal * VAT * 100) / 100 : h.vat} onChange={(e) => setH({ ...h, vat: e.target.value })} style={{ ...inp, width: 100, textAlign: "center" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `2px solid ${C.greenDeep}`, fontWeight: 800, fontSize: 17 }}><span>סה"כ הוצאה</span><span style={{ color: C.greenDeep }}>{NIS(total)}</span></div>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <button onClick={save} disabled={saving || scan === "busy"} style={{ width: "100%", marginTop: 14, padding: 13, borderRadius: 12, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: saving || scan === "busy" ? .6 : 1 }}><Save size={16} /> שמור חשבונית{toStore.length ? " והעלה " + toStore.length + " מוצרים לחנות" : ""}</button>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 8, textAlign: "center" }}>אחרי השמירה נשאר רק להוסיף תמונות למוצרים החדשים (לא חובה) ב"מוצרים ומלאי".</div>
    </Modal>
  );
}

function PurchaseInvoiceView({ inv, setState, onClose }) {
  const [files, setFiles] = useState(inv.img ? [inv.img] : []);
  const pageKeys = (inv.pages && inv.pages.length) ? inv.pages.map((_, n) => PINV_KEY(inv.id) + ":" + n) : (inv.hasFile ? [PINV_KEY(inv.id)] : []);
  useEffect(() => { if (inv.img || !pageKeys.length) return; (async () => { const out = []; for (const k of pageKeys) { try { const r = await window.storage.get(k); if (r && r.value) out.push(r.value); } catch (e) {} } setFiles(out); })(); }, [inv.id]);
  const del = async () => { if (!window.confirm("למחוק את החשבונית? המוצרים והמלאי שנוספו ממנה יישארו בחנות.")) return; for (const k of pageKeys) { try { await window.storage.delete(k); } catch (e) {} } setState((s) => ({ ...s, purchaseInvoices: (s.purchaseInvoices || []).filter((x) => x.id !== inv.id) })); onClose(); };
  const items = inv.items || [];
  return (
    <Modal onClose={onClose} title={"חשבונית קנייה" + (inv.number ? " #" + inv.number : "")}>
      <div style={{ fontSize: 13.5, marginBottom: 10 }}><b>{inv.supplier || "ספק לא ידוע"}</b> · {new Date(pinvDate(inv)).toLocaleDateString("he-IL")}</div>
      {files.length > 0 && <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>{files.length > 1 && <div style={{ fontSize: 12.5, color: C.sub, fontWeight: 700 }}>{files.length} דפים</div>}{files.map((file, n) => file.indexOf("data:application/pdf") === 0 ? <a key={n} href={file} download={((inv.pages && inv.pages[n] && inv.pages[n].name) || inv.fileName || "invoice") + (/\.pdf$/i.test((inv.pages && inv.pages[n] && inv.pages[n].name) || "") ? "" : ".pdf")} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.blue, fontWeight: 700, fontSize: 13 }}><FileText size={15} /> הורד PDF {files.length > 1 ? "(דף " + (n + 1) + ")" : "מקורי"}</a> : <a key={n} href={file} target="_blank" rel="noopener noreferrer"><img src={file} alt={"דף " + (n + 1)} style={{ width: "100%", maxHeight: 360, objectFit: "contain", borderRadius: 10, border: `1px solid ${C.line}`, background: "#F7F9FC" }} /></a>)}</div>}
      {items.length > 0 ? <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr style={{ textAlign: "right", color: C.sub, borderBottom: `1px solid ${C.line}` }}><Th>מוצר</Th><Th>כמות</Th><Th>מחיר</Th><Th>הנחה</Th><Th>סה"כ</Th></tr></thead>
        <tbody>{items.map((it, i) => <tr key={i} style={{ borderBottom: `1px solid ${C.line}` }}><Td>{it.name}</Td><Td>{it.qty}{it.unit === "weight" ? ' ק"ג' : it.unit === "unit" ? " יח'" : " קרט'"}</Td><Td>{NIS(it.buy)}</Td><Td>{it.disc ? it.disc + "%" : "—"}</Td><Td strong>{NIS(it.total)}</Td></tr>)}</tbody>
      </table></div> : <Empty>חשבונית שנקלטה בגרסה קודמת — {inv.count || 0} מוצרים</Empty>}
      <div style={{ marginInlineStart: "auto", maxWidth: 260, marginTop: 10, fontSize: 14 }}>
        {inv.subtotal != null && <div style={{ display: "flex", justifyContent: "space-between" }}><span>לפני מע"מ</span><b>{NIS(inv.subtotal)}</b></div>}
        {inv.vat != null && <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span>מע"מ</span><b>{NIS(inv.vat)}</b></div>}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: `2px solid ${C.greenDeep}`, fontWeight: 800, fontSize: 16 }}><span>סה"כ</span><span style={{ color: C.greenDeep }}>{NIS(pinvTotal(inv))}</span></div>
      </div>
      <button onClick={del} style={{ marginTop: 14, border: `1px solid ${C.red}`, background: "#fff", color: C.red, fontWeight: 700, fontSize: 13, padding: "8px 14px", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Trash2 size={14} /> מחק חשבונית</button>
    </Modal>
  );
}

function downloadFinanceReport(state, mk, fmt) {
  const orders = state.orders.filter((o) => monthKey(o.date) === mk).sort((a, b) => a.date - b.date);
  const invs = monthInvoices(state, mk).slice().reverse();
  const inc = monthIncome(state, mk), exp = monthExpenses(state, mk), expVat = invs.reduce((s, iv) => s + (iv.vat || 0), 0);
  const cName = (id) => { const c = state.clients.find((x) => x.id === id); return c ? c.name : "לקוח"; };
  const ml = monthLabelOf(mk); const fname = "b2b-report-" + mk;
  const dl = (content, type, ext) => { try { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = fname + ext; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (e) {} };
  if (fmt === "csv") {
    const q = (v) => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; const n2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
    const L = [];
    L.push([q("דוח הכנסות והוצאות"), q(state.name), q(ml)].join(","), "");
    L.push([q("סיכום"), q("סכום")].join(","), [q("הכנסות (הזמנות)"), n2(inc)].join(","), [q("הוצאות סחורה"), n2(exp)].join(","), [q('מתוכן מע"מ תשומות'), n2(expVat)].join(","), [q("רווח גולמי משוער"), n2(inc - exp)].join(","), "");
    L.push(q("הכנסות"), [q("תאריך"), q("הזמנה"), q("לקוח"), q("סכום"), q("שולם")].join(","));
    orders.forEach((o) => L.push([q(new Date(o.date).toLocaleDateString("he-IL")), q(o.id), q(cName(o.clientId)), n2(orderTotal(o, state.products)), q(o.paid ? "כן" : "לא")].join(",")));
    L.push("", q("הוצאות — חשבוניות קנייה"), [q("תאריך"), q("ספק"), q("מס' חשבונית"), q('לפני מע"מ'), q('מע"מ'), q('סה"כ')].join(","));
    invs.forEach((iv) => L.push([q(new Date(pinvDate(iv)).toLocaleDateString("he-IL")), q(iv.supplier || ""), q(iv.number || ""), n2(iv.subtotal || 0), n2(iv.vat || 0), n2(pinvTotal(iv))].join(",")));
    return dl("\uFEFF" + L.join("\r\n"), "text/csv;charset=utf-8", ".csv");
  }
  const color = (state.brand && state.brand.color) || "#0B2A63";
  const row = (cells, b) => "<tr>" + cells.map((c) => "<td" + (b ? ' style="font-weight:800"' : "") + ">" + c + "</td>").join("") + "</tr>";
  const html = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>דוח ${ml}</title><style>body{font-family:system-ui,Arial;padding:28px;color:#182620}h1{color:${color};margin:0 0 4px}h2{color:${color};font-size:17px;margin:22px 0 6px}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #E4E9DE;padding:7px;text-align:right;font-size:13px}thead tr{background:${color};color:#fff}.k{display:flex;gap:12px;margin-top:14px}.k div{flex:1;border:1px solid #E4E9DE;border-radius:10px;padding:10px}.k b{display:block;font-size:20px;color:${color}}</style></head><body><h1>דוח הכנסות והוצאות — ${ml}</h1><div style="color:#5B6B60">${state.name}${state.biz && state.biz.taxId ? " · ע.מ/ח.פ " + state.biz.taxId : ""} · הופק ${new Date().toLocaleDateString("he-IL")}</div><div class="k"><div>הכנסות<b>${NIS(inc)}</b></div><div>הוצאות סחורה<b>${NIS(exp)}</b></div><div>רווח גולמי משוער<b>${NIS(inc - exp)}</b></div></div><h2>הכנסות (${orders.length} הזמנות)</h2><table><thead><tr><th>תאריך</th><th>הזמנה</th><th>לקוח</th><th>סכום</th><th>שולם</th></tr></thead><tbody>${orders.map((o) => row([new Date(o.date).toLocaleDateString("he-IL"), "#" + o.id, cName(o.clientId), NIS(orderTotal(o, state.products)), o.paid ? "✓" : "—"])).join("")}${row(["", "", 'סה"כ', NIS(inc), ""], true)}</tbody></table><h2>הוצאות — חשבוניות קנייה (${invs.length})</h2><table><thead><tr><th>תאריך</th><th>ספק</th><th>מס' חשבונית</th><th>לפני מע"מ</th><th>מע"מ</th><th>סה"כ</th></tr></thead><tbody>${invs.map((iv) => row([new Date(pinvDate(iv)).toLocaleDateString("he-IL"), iv.supplier || "", iv.number || "", NIS(iv.subtotal || 0), NIS(iv.vat || 0), NIS(pinvTotal(iv))])).join("")}${row(["", "", 'סה"כ', "", NIS(expVat), NIS(exp)], true)}</tbody></table><p style="color:#5B6B60;font-size:11.5px;margin-top:20px">הדוח הופק אוטומטית ע"י B2B+ Marketplace ומיועד לעזר בלבד. אינו מהווה דוח חשבונאי רשמי.</p><script>window.onload=function(){setTimeout(function(){window.print()},300)}</script></body></html>`;
  dl(html, "text/html;charset=utf-8", ".html");
}

function FinanceView({ state, setState }) {
  const [mk, setMk] = useState(nowMonth);
  const [selY, selM] = mk.split("-").map(Number);
  const nowD = new Date(); const curY = nowD.getFullYear(), curM = nowD.getMonth();
  // שנים לבחירה: מהנתון הראשון במערכת ועד השנה הנוכחית
  const firstY = Math.min(curY, ...state.orders.map((o) => new Date(o.date).getFullYear()), ...(state.purchaseInvoices || []).map((iv) => new Date(pinvDate(iv)).getFullYear()));
  const years = []; for (let y = curY; y >= Math.max(firstY, curY - 10); y--) years.push(y);
  const HE_MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const go = (y, m) => { if (y > curY || (y === curY && m > curM)) { y = curY; m = curM; } setMk(y + "-" + m); };
  const shift = (d) => { const t = new Date(selY, selM + d, 1); go(t.getFullYear(), t.getMonth()); };
  const atNow = selY === curY && selM === curM;
  const months = Array.from({ length: 12 }, (_, i) => monthKey(new Date(selY, selM - i, 1))); // 12 חודשים עד החודש הנבחר
  const [scan, setScan] = useState(false); const [view, setView] = useState(null); const [q, setQ] = useState(""); const [detail, setDetail] = useState(null);
  const inc = monthIncome(state, mk), exp = monthExpenses(state, mk), invs = monthInvoices(state, mk);
  const monthOrders = state.orders.filter((o) => monthKey(o.date) === mk).sort((a, b) => b.date - a.date);
  const shown = invs.filter((iv) => !q.trim() || ((iv.supplier || "") + " " + (iv.number || "")).toLowerCase().includes(q.trim().toLowerCase()));
  const six = months.slice(0, 6).reverse().map((m) => ({ m, inc: monthIncome(state, m), exp: monthExpenses(state, m) }));
  const mx = Math.max(1, ...six.map((x) => Math.max(x.inc, x.exp)));
  const all = state.purchaseInvoices || [];
  const byMonth = Array.from({ length: 12 }, (_, i) => monthKey(new Date(selY, 11 - i, 1))).map((m) => ({ m, list: monthInvoices(state, m) })).filter((x) => x.list.length);
  return (
    <div style={{ display: "grid", gap: 18 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Wallet size={18} />} extra={<button onClick={() => setScan(true)} style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 13.5, padding: "9px 15px", borderRadius: 10, cursor: "pointer" }}><ImageIcon size={16} /> סריקת חשבונית קנייה</button>}>הכנסות והוצאות</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", background: "#F7F9FC", border: `1px solid ${C.line}`, borderRadius: 14, padding: 10, marginBottom: 14 }}>
          <button onClick={() => shift(-1)} title="חודש קודם" style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${C.line}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.ink }}><ChevronRight size={20} /></button>
          <select value={selM} onChange={(e) => go(selY, +e.target.value)} style={{ ...fieldStyle, width: "auto", flex: "1 1 120px", fontWeight: 800, fontSize: 15, padding: "9px 10px" }}>{HE_MONTHS.map((n, i) => <option key={i} value={i} disabled={selY === curY && i > curM}>{n}</option>)}</select>
          <select value={selY} onChange={(e) => go(+e.target.value, selM)} style={{ ...fieldStyle, width: "auto", flex: "0 1 100px", fontWeight: 800, fontSize: 15, padding: "9px 10px" }}>{years.map((y) => <option key={y} value={y}>{y}</option>)}</select>
          <button onClick={() => shift(1)} disabled={atNow} title="חודש הבא" style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${C.line}`, background: "#fff", cursor: atNow ? "default" : "pointer", opacity: atNow ? .35 : 1, display: "flex", alignItems: "center", justifyContent: "center", color: C.ink }}><ChevronLeft size={20} /></button>
          {!atNow && <button onClick={() => go(curY, curM)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 10, cursor: "pointer" }}>החודש</button>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
          <button onClick={() => setDetail("income")} title="לחצו לפירוט" style={{ border: "none", background: "transparent", padding: 0, textAlign: "right", cursor: "pointer", borderRadius: 14, font: "inherit", color: "inherit" }}><Kpi bare icon={<ClipboardList size={17} />} label={"הכנסות מהזמנות · " + monthOrders.length} value={NIS(inc)} tone="green" /><div style={{ fontSize: 11.5, color: C.blue, fontWeight: 700, marginTop: 4, paddingInlineStart: 4 }}>לפירוט ›</div></button>
          <button onClick={() => setDetail("expense")} title="לחצו לפירוט" style={{ border: "none", background: "transparent", padding: 0, textAlign: "right", cursor: "pointer", borderRadius: 14, font: "inherit", color: "inherit" }}><Kpi bare icon={<Receipt size={17} />} label={"הוצאות על סחורה · " + invs.length} value={NIS(exp)} tone="red" /><div style={{ fontSize: 11.5, color: C.blue, fontWeight: 700, marginTop: 4, paddingInlineStart: 4 }}>לפירוט ›</div></button>
          <Kpi icon={<BarChart3 size={17} />} label="רווח גולמי משוער" value={NIS(inc - exp)} tone={inc - exp >= 0 ? "blue" : "red"} onClick={() => setDetail("profit")} hint="איך זה מחושב" />
          <Kpi icon={<FileText size={17} />} label="חשבוניות קנייה" value={invs.length} tone="plum" onClick={() => setDetail("expense")} hint="לכל החשבוניות" />
        </div>
        {(() => { const ym = Array.from({ length: 12 }, (_, i) => monthKey(new Date(selY, i, 1))); const yi = ym.reduce((a, m) => a + monthIncome(state, m), 0), ye = ym.reduce((a, m) => a + monthExpenses(state, m), 0); return <div style={{ marginTop: 12, fontSize: 13, color: C.sub, background: "#F7F9FC", borderRadius: 10, padding: "8px 12px", display: "flex", gap: 14, flexWrap: "wrap" }}><b style={{ color: C.ink }}>סיכום {selY}:</b><span>הכנסות <b style={{ color: C.greenDeep }}>{NIS(yi)}</b></span><span>הוצאות <b style={{ color: C.red }}>{NIS(ye)}</b></span><span>רווח גולמי <b style={{ color: yi - ye >= 0 ? C.blue : C.red }}>{NIS(yi - ye)}</b></span></div>; })()}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <button onClick={() => downloadFinanceReport(state, mk, "csv")} style={{ border: `1px solid ${C.green}`, background: "#fff", color: C.greenDeep, fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Download size={15} /> דוח {monthLabelOf(mk)} לאקסל</button>
          <button onClick={() => downloadFinanceReport(state, mk, "html")} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><FileText size={15} /> דוח להדפסה / PDF</button>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "flex", gap: 14, alignItems: "center" }}>6 חודשים אחרונים <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: C.sub, fontWeight: 500 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: C.green }} />הכנסות</span><span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: C.sub, fontWeight: 500 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: C.red }} />הוצאות</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, alignItems: "end", height: 130 }}>{six.map((x) => (
            <button key={x.m} onClick={() => setMk(x.m)} title={monthLabelOf(x.m)} style={{ border: "none", background: x.m === mk ? "#F1F5FB" : "transparent", borderRadius: 8, padding: "4px 2px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 96 }}><div style={{ width: 14, height: Math.max(2, 96 * x.inc / mx), background: C.green, borderRadius: 3 }} /><div style={{ width: 14, height: Math.max(2, 96 * x.exp / mx), background: C.red, borderRadius: 3 }} /></div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>{monthLabelOf(x.m).split(" ")[0]}</div>
            </button>))}</div>
        </div>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Receipt size={18} />} extra={<Badge>{all.length} סה"כ</Badge>}>חשבוניות הקנייה שלי · {monthLabelOf(mk)}</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש לפי ספק או מספר חשבונית" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        {shown.length === 0 ? <Empty>אין חשבוניות קנייה ב{monthLabelOf(mk)}. לחצו "סריקת חשבונית קנייה" כדי להוסיף.</Empty> : <div style={{ display: "grid", gap: 8 }}>{shown.map((iv) => (
          <button key={iv.id} onClick={() => setView(iv)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "11px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: C.redSoft, color: C.red, display: "flex", alignItems: "center", justifyContent: "center" }}><Receipt size={18} /></div>
            <div style={{ flex: 1, minWidth: 140 }}><div style={{ fontWeight: 800 }}>{iv.supplier || "חשבונית סחורה"}{iv.number ? " · #" + iv.number : ""}</div><div style={{ fontSize: 12, color: C.sub }}>{new Date(pinvDate(iv)).toLocaleDateString("he-IL")} · {(iv.items || []).length || iv.count || 0} שורות{iv.hasFile || iv.img ? " · 📎 " + ((iv.pages && iv.pages.length > 1) ? iv.pages.length + " דפים" : "מקור שמור") : ""}</div></div>
            <span style={{ fontWeight: 800, color: C.red }}>{NIS(pinvTotal(iv))}</span>
          </button>))}</div>}
        {byMonth.length > 1 && <div style={{ marginTop: 16, borderTop: `1px dashed ${C.line}`, paddingTop: 12 }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>כל החודשים ב-{selY}</div><div style={{ display: "grid", gap: 6 }}>{byMonth.map((x) => <button key={x.m} onClick={() => setMk(x.m)} style={{ display: "flex", justifyContent: "space-between", border: `1px solid ${x.m === mk ? C.green : C.line}`, background: x.m === mk ? C.greenSoft : "#fff", borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontSize: 13 }}><span style={{ fontWeight: 700 }}>{monthLabelOf(x.m)} · {x.list.length} חשבוניות</span><span style={{ fontWeight: 800, color: C.red }}>{NIS(x.list.reduce((s, iv) => s + pinvTotal(iv), 0))}</span></button>)}</div></div>}
      </Panel>
      {scan && <PurchaseScanModal state={state} setState={setState} onClose={(rec) => { setScan(false); if (rec && rec.date) setMk(monthKey(pinvDate(rec))); }} />}
      {detail === "profit" && <Modal onClose={() => setDetail(null)} title={"רווח גולמי · " + monthLabelOf(mk)}>
        <button className="tp-click" onClick={() => setDetail("income")} style={{ width: "100%", textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", font: "inherit", color: "inherit", marginBottom: 8 }}><span>הכנסות מ-{monthOrders.length} הזמנות</span><span style={{ display: "flex", alignItems: "center", gap: 6 }}><b style={{ color: C.greenDeep }}>{NIS(inc)}</b><ChevronLeft size={16} color={C.sub} /></span></button>
        <button className="tp-click" onClick={() => setDetail("expense")} style={{ width: "100%", textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", font: "inherit", color: "inherit" }}><span>פחות הוצאות סחורה ({invs.length} חשבוניות)</span><span style={{ display: "flex", alignItems: "center", gap: 6 }}><b style={{ color: C.red }}>− {NIS(exp)}</b><ChevronLeft size={16} color={C.sub} /></span></button>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `2px solid ${C.blue}`, fontWeight: 800, fontSize: 17 }}><span>רווח גולמי משוער</span><span style={{ color: inc - exp >= 0 ? C.blue : C.red }}>{NIS(inc - exp)}</span></div>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 8 }}>הערכה בלבד: הכנסות מהזמנות פחות חשבוניות קנייה של אותו חודש (כולל מע"מ). לא כולל הוצאות אחרות.</div>
      </Modal>}
      {detail === "income" && <IncomeDetail state={state} mk={mk} orders={monthOrders} onClose={() => setDetail(null)} />}
      {detail === "expense" && <ExpenseDetail invs={invs} mk={mk} onOpen={(iv) => setView(iv)} onScan={() => { setDetail(null); setScan(true); }} onClose={() => setDetail(null)} />}
      {view && <PurchaseInvoiceView inv={view} setState={setState} onClose={() => setView(null)} />}
    </div>
  );
}
// פירוט הכנסות: כל ההזמנות של החודש
function IncomeDetail({ state, mk, orders, onClose }) {
  const [f, setF] = useState("all"); const [open, setOpen] = useState(null);
  const cName = (id) => { const c = state.clients.find((x) => x.id === id); return c ? c.name : "לקוח"; };
  const tot = (o) => orderTotal(o, state.products);
  const list = orders.filter((o) => f === "all" || (f === "paid" ? o.paid : !o.paid));
  const sum = list.reduce((s, o) => s + tot(o), 0), paidSum = orders.filter((o) => o.paid).reduce((s, o) => s + tot(o), 0), openSum = orders.filter((o) => !o.paid).reduce((s, o) => s + tot(o), 0);
  return (
    <Modal onClose={onClose} title={"הכנסות · " + monthLabelOf(mk)}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ background: C.greenSoft, borderRadius: 12, padding: "10px 12px" }}><div style={{ fontSize: 12, color: C.greenDeep }}>שולם</div><div style={{ fontWeight: 800, fontSize: 18, color: C.greenDeep }}>{NIS(paidSum)}</div></div>
        <div style={{ background: C.amberSoft, borderRadius: 12, padding: "10px 12px" }}><div style={{ fontSize: 12, color: "#7A5A17" }}>פתוח לגבייה</div><div style={{ fontWeight: 800, fontSize: 18, color: "#7A5A17" }}>{NIS(openSum)}</div></div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>{[["all", "הכל · " + orders.length], ["paid", "שולמו · " + orders.filter((o) => o.paid).length], ["open", "לא שולמו · " + orders.filter((o) => !o.paid).length]].map(([k, l]) => <button key={k} onClick={() => setF(k)} style={{ border: `1px solid ${f === k ? C.green : C.line}`, background: f === k ? C.green : "#fff", color: f === k ? "#fff" : C.sub, borderRadius: 20, padding: "5px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{l}</button>)}</div>
      {list.length === 0 ? <Empty>אין הזמנות {f === "paid" ? "ששולמו " : f === "open" ? "פתוחות " : ""}ב{monthLabelOf(mk)}</Empty> : <div style={{ display: "grid", gap: 8, maxHeight: 420, overflow: "auto" }}>{list.map((o) => { const st = STATUS[o.status] || { label: o.status, color: C.sub, bg: "#EEF1EC" }; const isOpen = open === o.id; return (
        <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, background: "#fff" }}>
          <button onClick={() => setOpen(isOpen ? null : o.id)} style={{ width: "100%", border: "none", background: "transparent", padding: "10px 12px", cursor: "pointer", textAlign: "right", display: "flex", alignItems: "center", gap: 10, font: "inherit", color: "inherit" }}>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{cName(o.clientId)} <span style={{ color: C.sub, fontWeight: 500, fontSize: 12 }}>#{o.id}</span></div><div style={{ fontSize: 12, color: C.sub, marginTop: 2, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>{new Date(o.date).toLocaleDateString("he-IL")} · <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: "1px 6px", fontWeight: 700 }}>{st.label}</span></div></div>
            <div style={{ textAlign: "left" }}><div style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(tot(o))}</div><div style={{ fontSize: 11.5, fontWeight: 700, color: o.paid ? C.greenDeep : C.amber }}>{o.paid ? "✓ שולם" : "לא שולם"}</div></div>
            <ChevronLeft size={16} color={C.sub} style={{ transform: isOpen ? "rotate(-90deg)" : "none", transition: "transform .15s" }} />
          </button>
          {isOpen && <div style={{ borderTop: `1px dashed ${C.line}`, padding: "8px 12px 10px" }}>{(o.items || []).map((it, i) => { const p = state.products.find((x) => x.id === it.pid); const q = it.supplied != null ? it.supplied : it.cartons; return <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "3px 0" }}><span>{p ? (p.emoji ? p.emoji + " " : "") + p.name : "מוצר שנמחק"}</span><span style={{ color: C.sub }}>{q} {p && !isPack(p) ? "קרט'" : p && p.unit === "unit" ? "יח'" : "קרט'"}{it.actualKg ? " · " + it.actualKg + ' ק"ג' : ""}</span></div>; })}{o.note && <div style={{ fontSize: 12, color: C.sub, marginTop: 6 }}>הערה: {o.note}</div>}</div>}
        </div>); })}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: `2px solid ${C.greenDeep}`, fontWeight: 800, fontSize: 16 }}><span>סה"כ {list.length} הזמנות</span><span style={{ color: C.greenDeep }}>{NIS(sum)}</span></div>
    </Modal>
  );
}
// פירוט הוצאות: כל חשבוניות הקנייה של החודש
function ExpenseDetail({ invs, mk, onOpen, onScan, onClose }) {
  const sub = invs.reduce((s, iv) => s + (iv.subtotal || 0), 0), vat = invs.reduce((s, iv) => s + (iv.vat || 0), 0), tot = invs.reduce((s, iv) => s + pinvTotal(iv), 0);
  const bySup = {}; invs.forEach((iv) => { const k = iv.supplier || "ללא שם ספק"; bySup[k] = (bySup[k] || 0) + pinvTotal(iv); });
  const sups = Object.entries(bySup).sort((a, b) => b[1] - a[1]);
  return (
    <Modal onClose={onClose} title={"הוצאות על סחורה · " + monthLabelOf(mk)}>
      {invs.length === 0 ? <><Empty>אין חשבוניות קנייה ב{monthLabelOf(mk)}</Empty><SubmitBtn onClick={onScan}>סריקת חשבונית קנייה</SubmitBtn></> : <>
        {sups.length > 1 && <div style={{ background: "#F7F9FC", borderRadius: 12, padding: "10px 12px", marginBottom: 12 }}><div style={{ fontSize: 12.5, fontWeight: 700, color: C.sub, marginBottom: 6 }}>לפי ספק</div>{sups.map(([n, v]) => <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "2px 0" }}><span>{n}</span><b>{NIS(v)}</b></div>)}</div>}
        <div style={{ display: "grid", gap: 8, maxHeight: 400, overflow: "auto" }}>{invs.map((iv) => (
          <button key={iv.id} onClick={() => onOpen(iv)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, font: "inherit", color: "inherit" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.redSoft, color: C.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Receipt size={17} /></div>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 14 }}>{iv.supplier || "חשבונית סחורה"}{iv.number ? " · #" + iv.number : ""}</div><div style={{ fontSize: 12, color: C.sub }}>{new Date(pinvDate(iv)).toLocaleDateString("he-IL")} · {(iv.items || []).length || iv.count || 0} שורות{iv.pages && iv.pages.length > 1 ? " · 📎 " + iv.pages.length + " דפים" : iv.hasFile || iv.img ? " · 📎" : ""}</div></div>
            <div style={{ textAlign: "left" }}><div style={{ fontWeight: 800, color: C.red }}>{NIS(pinvTotal(iv))}</div>{iv.vat ? <div style={{ fontSize: 11, color: C.sub }}>מע"מ {NIS(iv.vat)}</div> : null}</div>
            <ChevronLeft size={16} color={C.sub} />
          </button>))}</div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `2px solid ${C.red}`, fontSize: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>לפני מע"מ</span><b>{NIS(sub)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}><span>מע"מ תשומות</span><b>{NIS(vat)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontWeight: 800, fontSize: 16 }}><span>סה"כ {invs.length} חשבוניות</span><span style={{ color: C.red }}>{NIS(tot)}</span></div>
        </div>
      </>}
    </Modal>
  );
}

function MgrProducts({ state, setState }) {
  const [add, setAdd] = useState(false); const [q, setQ] = useState(""); const [newCat, setNewCat] = useState(""); const [intake, setIntake] = useState(false);
  const cats = state.cats || [];
  const addCat = () => { const v = newCat.trim(); if (!v) return; setState((s) => ({ ...s, cats: [...(s.cats || []), v].filter((x, i, a) => a.indexOf(x) === i) })); setNewCat(""); };
  const removeCat = (cat) => setState((s) => ({ ...s, cats: (s.cats || []).filter((c) => c !== cat), products: s.products.map((pr) => pr.cat === cat ? { ...pr, cat: "" } : pr) }));
  const products = state.products;
  const upd = (pid, k, v) => setState((s) => ({ ...s, products: s.products.map((p) => p.id === pid ? { ...p, [k]: v } : p) }));
  const num = (pid, k, v) => upd(pid, k, Math.max(0, v));
  const del = (pid) => setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== pid) }));
  const pickImg = (pid, file) => pickImage(file, 480, (d) => upd(pid, "img", d));
  const low = products.filter((p) => p.stock <= LOW);
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {low.length > 0 && <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.amberSoft, border: "1px solid #E4D3A8", color: "#7A5A17", borderRadius: 14, padding: "12px 16px", fontSize: 14, flexWrap: "wrap" }}><AlertTriangle size={18} style={{ color: C.amber }} /><b>מלאי נמוך / אזל:</b>{low.map((p) => <span key={p.id}>{p.emoji} {p.name} ({p.stock === 0 ? "אזל" : p.stock})</span>)}</div>}
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Boxes size={18} />} extra={<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><button onClick={() => hasFeature(state, "scan") ? setIntake(true) : alert("סריקת חשבוניות זמינה במסלול פרימיום. אפשר לשדרג ב\"החנות שלי ← המנוי שלי\".")} style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${C.green}`, background: "#fff", color: C.greenDeep, fontWeight: 700, fontSize: 13, padding: "7px 13px", borderRadius: 9, cursor: "pointer" }}><ImageIcon size={15} /> סריקת חשבונית</button><button onClick={() => setAdd(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "7px 13px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> מוצר חדש</button></div>}>ניהול מוצרים ומלאי</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מוצר" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 14, background: "#F7F9FC", borderRadius: 10, padding: 10 }}><span style={{ fontSize: 13, color: C.sub, fontWeight: 700 }}>קטגוריות:</span>{cats.map((cat) => <span key={cat} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.greenSoft, color: C.greenDeep, borderRadius: 20, padding: "4px 10px", fontSize: 12.5, fontWeight: 700 }}>{cat}<button onClick={() => removeCat(cat)} style={{ border: "none", background: "transparent", color: C.greenDeep, cursor: "pointer", padding: 0, display: "flex" }}><X size={13} /></button></span>)}<input value={newCat} onChange={(e) => setNewCat(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCat()} placeholder="קטגוריה חדשה" style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 10px", fontSize: 13, fontFamily: "inherit" }} /><button onClick={addCat} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 8, cursor: "pointer" }}>הוסף</button></div>
        <div style={{ display: "grid", gap: 10 }}>
          {products.filter((p) => !q.trim() || p.name.toLowerCase().includes(q.trim().toLowerCase())).map((p) => { const isC = isPack(p); const unitTxt = isC ? packWord(p) : "ק\"ג"; const m = p.price - p.cost; const out = p.stock <= 0, lw = p.stock > 0 && p.stock <= LOW; return (
            <div key={p.id} style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 12, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <label style={{ cursor: "pointer", position: "relative" }}><ProdThumb p={p} size={54} /><input type="file" accept="image/*" onChange={(e) => pickImg(p.id, e.target.files[0])} style={{ display: "none" }} /><span style={{ position: "absolute", bottom: -4, left: -4, background: C.green, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}><ImageIcon size={11} /></span></label>
              <div style={{ minWidth: 120 }}><div style={{ fontWeight: 700 }}>{p.name}</div><select value={p.unit} onChange={(e) => upd(p.id, "unit", e.target.value)} style={{ marginTop: 4, border: `1px solid ${C.line}`, borderRadius: 8, padding: "3px 6px", fontSize: 12, fontFamily: "inherit" }}>{UNIT_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select><select value={p.cat || ""} onChange={(e) => upd(p.id, "cat", e.target.value)} style={{ marginTop: 4, marginInlineStart: 4, border: `1px solid ${C.line}`, borderRadius: 8, padding: "3px 6px", fontSize: 12, fontFamily: "inherit" }}><option value="">ללא קטגוריה</option>{cats.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
              <LabIn label={"עלות " + unitTxt} val={isC ? p.cost * p.kg : p.cost} step="0.1" onChange={(v) => num(p.id, "cost", isC ? v / p.kg : v)} />
              <LabIn label={"מחיר " + unitTxt} val={isC ? p.price * p.kg : p.price} step="0.1" onChange={(v) => num(p.id, "price", isC ? v / p.kg : v)} />
              <LabIn label={'ק"ג/קרטון'} val={p.kg} onChange={(v) => num(p.id, "kg", v)} />
              {p.unit === "carton" && <LabIn label="יח' בקרטון" val={p.units || 0} onChange={(v) => num(p.id, "units", v)} />}
              <div style={{ fontSize: 12, color: C.sub }}>רווח<br /><b style={{ color: m <= 0 ? C.red : C.greenDeep, fontSize: 14 }}>{NIS(isC ? m * p.kg : m)}/{unitTxt}</b></div>
              <LabIn label="מלאי" val={p.stock} onChange={(v) => num(p.id, "stock", v)} />
              <span style={{ fontSize: 12, fontWeight: 700, color: out ? C.red : lw ? C.amber : C.green }}>{out ? "אזל" : lw ? "נמוך" : "תקין"}</span>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.sub }}><input type="checkbox" checked={!!p.noPrice} onChange={(e) => upd(p.id, "noPrice", e.target.checked)} /> ללא מחיר</label>
              <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.sub }}><input type="checkbox" checked={p.vatIncluded !== false} onChange={(e) => upd(p.id, "vatIncluded", e.target.checked)} /> כולל מע"מ</label>
              <button onClick={() => del(p.id)} title="מחק מוצר" style={{ marginInlineStart: "auto", border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button>
            </div>
          ); })}
        </div>
      </Panel>
      {add && <AddProduct state={state} setState={setState} onClose={() => setAdd(false)} />}
      {intake && <PurchaseScanModal state={state} setState={setState} onClose={() => setIntake(false)} />}
    </div>
  );
}
function AddProduct({ state, setState, onClose }) {
  const [f, setF] = useState({ name: "", unit: "weight", kg: 10, units: "", cost: "", price: "", stock: "", emoji: "🥗", img: "", noPrice: false, vatIncluded: true, cat: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const pickImg = (file) => pickImage(file, 480, (d) => setF((s) => ({ ...s, img: d })));
  const unitTxt = isPack(f) ? packWord(f) : "ק\"ג";
  const save = () => {
    if (!f.name.trim()) return setErr("שם המוצר חובה");
    const kg = Math.max(1, +f.kg || 1);
    const cRaw = Math.max(0, +f.cost || 0), pRaw = Math.max(0, +f.price || 0);
    const prod = { id: "p" + Date.now(), name: f.name.trim(), unit: f.unit, kg, units: Math.max(0, +f.units || 0), cost: isPack(f) ? cRaw / kg : cRaw, price: f.noPrice ? 0 : (isPack(f) ? pRaw / kg : pRaw), stock: Math.max(0, +f.stock || 0), emoji: f.emoji || "🥗", img: f.img, noPrice: f.noPrice, vatIncluded: f.vatIncluded, cat: f.cat };
    setState((s) => ({ ...s, products: [...s.products, prod] }));
    onClose();
  };
  return (
    <Modal onClose={onClose} title="הוספת מוצר חדש">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <ProdThumb p={{ img: f.img, emoji: f.emoji || "🥗", id: "new" }} size={54} />
        <div style={{ fontSize: 12.5, color: C.sub }}>תצוגה מקדימה · אפשר להעלות תמונה או להשתמש באימוג'י</div>
      </div>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם המוצר *" value={f.name} onChange={set("name")} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>סוג יחידה</div><select value={f.unit} onChange={set("unit")} style={fieldStyle}>{UNIT_OPTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>קטגוריה</div><select value={f.cat} onChange={set("cat")} style={fieldStyle}><option value="">ללא קטגוריה</option>{(state.cats || []).map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></label>
        <Field label={'ק"ג לקרטון'} type="number" value={f.kg} onChange={set("kg")} />
        {f.unit === "carton" && <Field label="יחידות בקרטון" type="number" value={f.units} onChange={set("units")} />}
        <Field label="מלאי (קרטונים)" type="number" value={f.stock} onChange={set("stock")} />
        <Field label={"עלות ל" + unitTxt + " (₪)"} type="number" value={f.cost} onChange={set("cost")} />
        <Field label={"מחיר ל" + unitTxt + " (₪)"} type="number" value={f.price} onChange={set("price")} disabled={f.noPrice} />
        <Field label="אימוג'י" value={f.emoji} onChange={set("emoji")} />
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={f.noPrice} onChange={(e) => setF((s) => ({ ...s, noPrice: e.target.checked }))} /> ללא מחיר (לפי הצעת מחיר)</label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sub, cursor: "pointer" }}><input type="checkbox" checked={f.vatIncluded !== false} onChange={(e) => setF((s) => ({ ...s, vatIncluded: e.target.checked }))} /> המחיר כולל מע"מ</label>
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>תמונה</div><label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "9px 12px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> {f.img ? "הוחלפה ✓" : "העלה תמונה"}<input type="file" accept="image/*" onChange={(e) => pickImg(e.target.files[0])} style={{ display: "none" }} /></label></label>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <SubmitBtn onClick={save}>הוסף מוצר</SubmitBtn>
    </Modal>
  );
}

function CenterWrap({ children, color }) {
  return <div dir="rtl" style={{ minHeight: "100vh", fontFamily: FONT, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 16px", background: `radial-gradient(1200px 500px at 50% -8%, ${color}22, ${C.bg})` }}>{children}</div>;
}
function StorePage({ supplier, state, setState, onLogin }) {
  const [mode, setMode] = useState("view");
  const color = (supplier.brand && supplier.brand.color) || C.green;
  const font = (supplier.brand && supplier.brand.font) || "Rubik";
  const scale = (supplier.brand && supplier.brand.fontScale) || 1;
  const bg = bgStyle((supplier.brand && supplier.brand.bg) || "soft", color, supplier.brand && supplier.brand.bgColor);
  const fontColor = (supplier.brand && supplier.brand.fontColor) || C.ink;
  const borderW = (supplier.brand && supplier.brand.borderW != null) ? supplier.brand.borderW : 1.5;
  const fam = `'${font}', ${FONT}`;
  const fs = (n) => Math.round(n * scale);
  useEffect(() => { if (font === "Rubik") return; const id = "gf-" + font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [font]);
  const back = () => setMode("view");
  if (mode === "login") return <CenterWrap color={color}><LoginForm state={state} onLogin={onLogin} back={back} onForgot={() => setMode("forgot")} /></CenterWrap>;
  if (mode === "forgot") return <CenterWrap color={color}><ForgotForm state={state} back={() => setMode("login")} /></CenterWrap>;
  if (mode === "register") return <CenterWrap color={color}><RegisterForm state={state} setState={setState} back={back} lockSupplier={supplier.id} /></CenterWrap>;
  const prods = supplier.products.filter((p) => p.stock > 0).slice(0, 12);
  return (
    <div dir="rtl" style={{ minHeight: "100vh", fontFamily: fam, background: bg, color: fontColor }}>
      <div style={{ background: `linear-gradient(135deg, ${color}, ${shade(color)})`, color: "#fff", padding: "40px 20px 46px", boxShadow: "0 4px 20px rgba(0,0,0,.12)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <Logo size={66} img={supplier.brand && supplier.brand.logo} name={supplier.name} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: fs(27), fontWeight: 800, letterSpacing: "-0.5px" }}>{supplier.name}</div>
            <div style={{ opacity: .92, marginTop: 4, fontSize: fs(15) }}>{(supplier.brand && supplier.brand.tagline) || "ספק לעסקים"}</div>
            <div style={{ marginTop: 6, fontSize: fs(12.5), opacity: .85, display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.18)", padding: "3px 10px", borderRadius: 20 }}>{supplier.category}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setMode("register")} style={{ border: "none", background: "#fff", color, fontWeight: 800, fontSize: fs(15), padding: "12px 22px", borderRadius: 12, cursor: "pointer" }}>הרשמה להזמנה</button>
            <button onClick={() => setMode("login")} style={{ border: "1.5px solid rgba(255,255,255,.75)", background: "transparent", color: "#fff", fontWeight: 800, fontSize: fs(15), padding: "12px 22px", borderRadius: 12, cursor: "pointer" }}>כניסת לקוח</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 20px 60px" }}>
        <h2 style={{ fontSize: fs(19), fontWeight: 800, margin: "0 0 14px" }}>המוצרים שלנו</h2>
        {prods.length === 0 ? <div style={{ color: C.sub }}>הקטלוג יתעדכן בקרוב.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
            {prods.map((p) => (
              <div key={p.id} style={{ border: `${Math.max(1.5, borderW)}px solid ${borderW > 0 ? color : C.line}`, borderRadius: 16, padding: 12, background: "#fff", boxShadow: SH }}>
                <ProdThumb p={p} tint={color} /><div style={{ fontWeight: 700, marginTop: 8, fontSize: fs(14), color: C.ink }}>{p.name}</div>
                <div style={{ fontSize: fs(12), color: C.sub }}>{isPack(p) ? (p.unit === "unit" ? "לפי יחידה" : p.units ? "קרטון · " + p.units + " יחידות" : "לפי קרטון") : "קרטון " + p.kg + " ק\"ג"}</div>
                <div style={{ fontWeight: 800, marginTop: 4, color, fontSize: fs(15) }}>{noPrice(p) ? "לפי הצעת מחיר" : <>{NIS(cartonPriceGross(p))} <span style={{ fontSize: fs(11), color: C.sub, fontWeight: 500 }}>/ {packWord(p)}</span></>}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <button onClick={() => setMode("register")} style={{ border: "none", background: color, color: "#fff", fontWeight: 800, fontSize: fs(16), padding: "14px 32px", borderRadius: 14, cursor: "pointer", boxShadow: `0 6px 18px ${color}55` }}>הצטרפו והזמינו מ{supplier.name}</button>
          <div style={{ fontSize: 12, color: C.sub, marginTop: 14 }}>מופעל על ידי B2B+ · ממשק הזמנות מהספק לעסק</div>
        </div>
      </div>
    </div>
  );
}
function StoreDesign({ state, setState }) {
  const feat = state.features || { prizes: true, chat: true, minOrder: 5 };
  const b = state.brand || {};
  const [f, setF] = useState({ name: state.name || "", tagline: b.tagline || "", category: state.category || "", regions: state.regions || "", color: b.color || C.green, bg: b.bg || "soft", bgColor: b.bgColor || "#F4F7F1", fontColor: b.fontColor || C.ink, font: b.font || "Rubik", fontScale: b.fontScale || 1, borderW: b.borderW == null ? 2.5 : b.borderW });
  useEffect(() => { if (f.font === "Rubik") return; const id = "gf-" + f.font.replace(/\s+/g, ""); if (document.getElementById(id)) return; const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=" + f.font.replace(/\s+/g, "+") + ":wght@400;600;700;800&display=swap"; document.head.appendChild(l); }, [f.font]);
  const pickLogo = (file) => pickImage(file, 360, (d) => setState((s) => ({ ...s, brand: { ...(s.brand || {}), logo: d } })));
  const save = () => setState((s) => ({ ...s, name: f.name || s.name, category: f.category, regions: f.regions, brand: { ...(s.brand || {}), tagline: f.tagline, color: f.color, bg: f.bg, bgColor: f.bgColor, fontColor: f.fontColor, font: f.font, fontScale: f.fontScale, borderW: f.borderW } }));
  const setFeat = (k, v) => setState((s) => ({ ...s, features: { ...(s.features || { prizes: true, chat: true, minOrder: 5 }), [k]: v } }));
  const swatches = ["#1F7A4D", "#2C6E9B", "#B23B3B", "#B4791F", "#6D3B8E", "#0E7C86", "#C2410C", "#334155"];
  const fam = `'${f.font}', ${FONT}`;
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Building2 size={18} />}>עיצוב החנות</SectionTitle>
        <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, border: `1px solid ${C.line}` }}>
          <div style={{ background: bgStyle(f.bg, f.color, f.bgColor), padding: 16, fontFamily: fam, color: f.fontColor }}>
            <div style={{ background: `linear-gradient(135deg, ${f.color}, ${shade(f.color)})`, color: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <Logo size={46} img={state.brand && state.brand.logo} name={f.name || state.name} />
              <div><div style={{ fontWeight: 800, fontSize: Math.round(18 * f.fontScale) }}>{f.name || state.name}</div><div style={{ opacity: .9, fontSize: Math.round(12 * f.fontScale) }}>{f.tagline || "החנות שלך"}</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
              {(((state.products || []).filter((p) => p.stock > 0).slice(0, 2)).length ? (state.products || []).filter((p) => p.stock > 0).slice(0, 2) : [{ id: "ph1", name: "מוצר לדוגמה", emoji: "🛒", unit: "carton", kg: 1, price: 0, noPrice: true, img: "" }]).map((p) => (
                <div key={p.id} style={{ background: "#fff", border: `${f.borderW}px solid ${f.color}`, borderRadius: 12, padding: 10 }}>
                  {p.img ? <img src={p.img} alt={p.name} style={{ width: 34, height: 34, borderRadius: 9, objectFit: "cover" }} /> : <div style={{ width: 34, height: 34, borderRadius: 9, background: f.color + "1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.emoji || "🛒"}</div>}
                  <div style={{ fontWeight: 700, marginTop: 6, fontSize: Math.round(13 * f.fontScale), color: f.fontColor }}>{p.name}</div>
                  <div style={{ fontWeight: 800, color: f.color, fontSize: Math.round(14 * f.fontScale) }}>{noPrice(p) ? "לפי הצעה" : <>{NIS(cartonPriceGross(p))} <span style={{ fontSize: Math.round(10 * f.fontScale), color: C.sub, fontWeight: 500 }}>/ {packWord(p)}</span></>}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, background: "#fff", borderRadius: 12, padding: "10px 12px" }}>
              <span style={{ fontSize: Math.round(12 * f.fontScale), color: C.sub }}>לתשלום</span>
              <span style={{ fontWeight: 800, color: f.color, fontSize: Math.round(17 * f.fontScale) }}>₪166</span>
              <div style={{ flex: 1 }} />
              <span style={{ background: f.color, color: "#fff", borderRadius: 10, padding: "9px 18px", fontWeight: 800, fontSize: Math.round(13 * f.fontScale) }}>שלח הזמנה</span>
            </div>
          </div>
          <div style={{ padding: 10, fontSize: 12, color: C.sub, background: "#fff", textAlign: "center" }}>תצוגה מקדימה חיה — כך הלקוח יראה את החנות (צבע · גופן · גודל)</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <Logo size={50} img={state.brand && state.brand.logo} name={state.name} />
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px dashed ${C.line}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: C.green, fontWeight: 700, fontSize: 13 }}><ImageIcon size={15} /> החלף לוגו<input type="file" accept="image/*" onChange={(e) => pickLogo(e.target.files[0])} style={{ display: "none" }} /></label>
        </div>
        <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
          <Field label="שם החנות" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        </div>
        <DomainPicker selected={domainsOf(state).map((d) => d.id)} onChange={(ids) => { const pt = domainPatch(ids); setF({ ...f, category: pt.category }); setState((s) => { const add = ids.filter((id) => !domainsOf(s).some((d) => d.id === id)).flatMap((id) => (DOMAIN_BY_ID[id] || { cats: [] }).cats); return { ...s, ...pt, cats: Array.from(new Set([...(s.cats || []), ...add])) }; }); }} />
        <div style={{ fontSize: 12.5, color: C.sub, marginBottom: 10, background: "#F7F9FC", borderRadius: 10, padding: "8px 12px" }}>הלקוח יראה: <b style={{ color: C.ink }}>{orderPitch(state)}</b> · קטגוריות המוצרים שלך: {(state.cats || []).length ? (state.cats || []).join(" · ") : "עוד לא הוגדרו"} (עריכה ב"מוצרים ומלאי")</div>
        <Field label="סלוגן" value={f.tagline} onChange={(e) => setF({ ...f, tagline: e.target.value })} placeholder={"למשל: " + ((domainsOf(state)[0] || {}).label || "המוצרים שלנו") + " איכותיים לעסקים"} />
        <Field label="אזורי עבודה (מופרדים בפסיק)" value={f.regions} onChange={(e) => setF({ ...f, regions: e.target.value })} placeholder="למשל: מרכז, השרון, ירושלים" />
        <div style={{ fontSize: 13, color: C.sub, margin: "6px 0 6px" }}>צבע מסגרות המוצרים</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {swatches.map((sw) => <button key={sw} onClick={() => setF({ ...f, color: sw })} style={{ width: 30, height: 30, borderRadius: 8, background: sw, border: f.color === sw ? "3px solid #182620" : "2px solid #fff", boxShadow: "0 0 0 1px #ddd", cursor: "pointer" }} />)}
          <input type="color" value={f.color} onChange={(e) => setF({ ...f, color: e.target.value })} style={{ width: 38, height: 32, border: "none", background: "none", cursor: "pointer" }} />
        </div>

        <button onClick={save} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 12, border: "none", background: f.color, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>שמור עיצוב</button>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Gift size={18} />}>פיצ'רים בחנות</SectionTitle>
        <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14, cursor: "pointer" }}><input type="checkbox" checked={feat.prizes !== false} onChange={(e) => setFeat("prizes", e.target.checked)} /> תוכנית יעדים ופרסים ללקוחות</label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14, cursor: "pointer" }}><input type="checkbox" checked={feat.chat !== false} onChange={(e) => setFeat("chat", e.target.checked)} /> צ'אט / תמיכה ללקוחות</label>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", fontSize: 14 }}>מינימום הזמנה: <input type="number" value={feat.minOrder || 5} onChange={(e) => setFeat("minOrder", Math.max(1, +e.target.value))} style={{ width: 66, border: `1px solid ${C.line}`, borderRadius: 8, padding: "5px", textAlign: "center" }} /> קרטונים</div>
      </Panel>
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Receipt size={18} />}>פרטי חשבונית לעסק</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 10 }}>פרטים אלה יופיעו בכל חשבונית שהלקוחות מקבלים.</div>
        <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
          <Field label="ע.מ / ח.פ" value={(state.biz && state.biz.taxId) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), taxId: e.target.value } }))} />
          <Field label="כתובת העסק" value={(state.biz && state.biz.address) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), address: e.target.value } }))} />
          <Field label="טלפון" value={(state.biz && state.biz.phone) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), phone: e.target.value } }))} />
          <Field label="אימייל לחשבוניות" value={(state.biz && state.biz.email) || ""} onChange={(e) => setState((s) => ({ ...s, biz: { ...(s.biz || {}), email: e.target.value } }))} />
        </div>
      </Panel>
    </div>
  );
}
function downloadInvoice(order, state) {
  const c = state.clients.find((x) => x.id === order.clientId);
  const biz = state.biz || {};
  const color = (state.brand && state.brand.color) || "#0B2A63";
  const gross = orderTotal(order, state.products);
  const net = gross / (1 + VAT), vat = gross - net;
  const rows = order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); if (!p) return ""; const isC = isPack(p); const w = isC ? "—" : (it.actualKg != null ? KGL(it.actualKg) : "~" + KGL(it.cartons * p.kg)); const amt = noPrice(p) ? "לפי הצעה" : NIS(lineTotal(it, p)); return `<tr><td>${p.emoji} ${p.name}</td><td>${it.cartons} קרטונים</td><td>${w}</td><td>${amt}</td></tr>`; }).join("");
  const html = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>חשבונית ${order.invNo || order.id}</title><style>body{font-family:system-ui,Arial;padding:32px;color:#182620}h1{color:${color};margin:0;font-size:24px}table{width:100%;border-collapse:collapse;margin-top:16px}td,th{border-bottom:1px solid #E4E9DE;padding:8px;text-align:right}thead tr{background:${color};color:#fff}.tot{margin-top:16px;text-align:left;line-height:1.8}.tot b{font-size:20px;color:${color}}.hd{display:flex;justify-content:space-between;border-bottom:3px solid ${color};padding-bottom:10px}</style></head><body><div class="hd"><div><h1>${state.name}</h1><div style="color:#5B6B60;font-size:13px">${biz.taxId ? "ע.מ/ח.פ: " + biz.taxId + "<br>" : ""}${biz.address || ""}${biz.phone ? "<br>טל' " + biz.phone : ""}</div></div><div style="text-align:left"><div style="font-weight:800;color:${color};font-size:18px">חשבונית מס</div><div style="color:#5B6B60;font-size:13px">מס' ${order.invNo || order.id}<br>${new Date(order.date).toLocaleDateString("he-IL")}</div></div></div><div style="margin-top:12px">לכבוד: <b>${c ? c.name : ""}</b>${c && c.taxId ? " · ע.מ/ח.פ " + c.taxId : ""}<br>${c && c.address ? c.address : ""}</div><table><thead><tr><th>מוצר</th><th>כמות</th><th>משקל</th><th>סכום</th></tr></thead><tbody>${rows}</tbody></table><div class="tot">סכום לפני מע"מ: ${NIS(net)}<br>מע"מ ${Math.round(VAT * 100)}%: ${NIS(vat)}<br><b>סה"כ לתשלום: ${NIS(gross)}</b></div><p style="color:#5B6B60;font-size:12px">תשלום ב${(PAY[c ? c.pay : "cash"] || PAY.cash).label} · מופק ע"י ${state.name}</p></body></html>`;
  try { const blob = new Blob([html], { type: "text/html;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "invoice-" + (order.invNo || order.id) + ".html"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); } catch (e) {}
}
function InvoiceModal({ order, state, onClose, withAddress }) {
  const c = state.clients.find((x) => x.id === order.clientId);
  const priced = order.status === "delivered" || order.status === "picked";
  const color = (state.brand && state.brand.color) || C.greenDeep;
  const biz = state.biz || {};
  const pay = PAY[c ? c.pay : "cash"] || PAY.cash;
  const gross = orderTotal(order, state.products);
  const net = gross / (1 + VAT), vat = gross - net;
  const anyNoPrice = order.items.some((it) => { const p = state.products.find((x) => x.id === it.pid); return p && noPrice(p); });
  return (
    <Modal onClose={onClose} title={priced ? "חשבונית" : "פרטי הזמנה"}>
      <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, padding: 18, background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `2px solid ${color}`, paddingBottom: 12, marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Logo size={42} img={state.brand && state.brand.logo} name={state.name} />
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>{state.name}</div>
              {biz.taxId ? <div>ע.מ / ח.פ: {biz.taxId}</div> : null}
              {biz.address ? <div>{biz.address}</div> : null}
              {biz.phone ? <div>טלפון: {biz.phone}</div> : null}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color }}>{priced ? "חשבונית מס" : "אישור הזמנה"}</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>מס' {order.invNo || order.id}<br />{new Date(order.date).toLocaleDateString("he-IL")}<br /><span style={{ color: STATUS[order.status].color, fontWeight: 700 }}>{STATUS[order.status].label}</span></div>
          </div>
        </div>
        <div style={{ fontSize: 13, marginBottom: 10 }}><span style={{ color: C.sub }}>לכבוד:</span> <b>{c ? c.name : ""}</b>{c && c.taxId ? " · ע.מ/ח.פ " + c.taxId : ""}{c && c.contact ? " · " + c.contact : ""}{withAddress && c && c.address ? <div style={{ fontSize: 12.5, color: C.sub, marginTop: 2, display: "flex", gap: 5, alignItems: "center" }}><MapPin size={13} /> {c.address} · {c.phone}</div> : null}</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead><tr style={{ background: color, color: "#fff", textAlign: "right" }}><Th>מוצר</Th><Th>כמות</Th><Th>משקל</Th><Th>סכום</Th></tr></thead>
          <tbody>{order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); if (!p) return null; const isC = isPack(p); return (<tr key={it.pid} style={{ borderBottom: `1px solid ${C.line}` }}><Td>{p.emoji} {p.name}</Td><Td>{it.cartons} קרטונים{suppliedOf(it) < it.cartons ? " (סופקו " + suppliedOf(it) + ")" : ""}</Td><Td>{isC ? "—" : (it.actualKg != null ? KGL(it.actualKg) : "~" + KGL(it.cartons * p.kg))}</Td><Td strong>{noPrice(p) ? "לפי הצעה" : NIS(lineTotal(it, p))}</Td></tr>); })}</tbody>
        </table>
        <div style={{ marginInlineStart: "auto", maxWidth: 280, marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>סכום לפני מע"מ</span><span style={{ fontWeight: 700 }}>{NIS(net)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 6 }}><span>מע"מ {Math.round(VAT * 100)}%</span><span style={{ fontWeight: 700 }}>{NIS(vat)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `2px solid ${color}`, fontWeight: 800, fontSize: 18 }}><span>סה"כ לתשלום</span><span style={{ color }}>{NIS(gross)}</span></div>
        </div>
        {anyNoPrice && <div style={{ fontSize: 12, color: C.amber, marginTop: 8 }}>* פריטים המסומנים "לפי הצעה" יתומחרו בנפרד ואינם כלולים בסכום.</div>}
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, display: "flex", alignItems: "center", gap: 5 }}><pay.icon size={13} /> תשלום ב{pay.label}{!priced ? " · הסכום ייקבע בשקילה" : ""}</div>
      </div>
      <button onClick={() => downloadInvoice(order, state)} style={{ width: "100%", marginTop: 14, padding: 11, borderRadius: 12, border: `1px solid ${color}`, background: "#fff", color, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Download size={16} /> הורדת חשבונית (להדפסה / PDF)</button>
    </Modal>
  );
}
function MgrPrizes({ state, setState }) {
  const [open, setOpen] = useState(null);
  const perClient = state.clients.filter((c) => c.status === "active").map((c) => ({ ...c, pts: pointsOf(c.id, state.orders, state.products, state.kgPerPoint, state.periodMonths, state.periodAnchor) }));
  const tiers = sortTiers(state.prizeTiers);
  const updateTier = (id, k, v) => setState((s) => ({ ...s, prizeTiers: s.prizeTiers.map((t) => t.id === id ? { ...t, [k]: v } : t) }));
  const addTier = () => setState((s) => { const mx = s.prizeTiers.reduce((m, t) => Math.max(m, t.points), 0); return { ...s, prizeTiers: [...s.prizeTiers, { id: "t" + Date.now(), points: mx + 100, title: "פרס חדש", detail: "", cost: 0 }] }; });
  const removeTier = (id) => setState((s) => ({ ...s, prizeTiers: s.prizeTiers.filter((t) => t.id !== id) }));
  const prizeCost = perClient.reduce((s, c) => { const t = reachedTier(c.pts, tiers); return s + (t ? t.cost || 0 : 0); }, 0);
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<Gift size={18} />} extra={<button onClick={addTier} style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${C.line}`, background: "#fff", color: C.green, fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 9, cursor: "pointer" }}><Plus size={15} /> הוסף יעד</button>}>תוכנית היעדים והפרסים · {periodLabel(state.periodMonths, state.periodAnchor)}</SectionTitle>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: C.sub }}>{state.kgPerPoint} ק"ג = נקודה · מתאפס בכל תקופה · לחיצה על מספר הלקוחות מציגה מי הגיע.</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: C.sub, fontWeight: 700 }}>תקופת היעדים:</span>
        <select value={state.periodMonths || 1} onChange={(e) => { const v = +e.target.value; const n = new Date(); setState((s) => ({ ...s, periodMonths: v, periodAnchor: new Date(n.getFullYear(), n.getMonth(), 1).getTime() })); }} style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px 10px", fontSize: 13, fontFamily: "inherit" }}>{PERIOD_OPTS.map(([n, lbl]) => <option key={n} value={n}>{lbl}</option>)}</select>
      </div>
      <div style={{ fontSize: 12.5, color: C.greenDeep, background: C.greenSoft, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>התקופה הנוכחית: <b>{periodLabel(state.periodMonths, state.periodAnchor)}</b> · הנקודות מתאפסות ב-<b>{new Date(periodEndMs(state.periodMonths, state.periodAnchor)).toLocaleDateString("he-IL")}</b>. שינוי משך התקופה מתחיל ספירה חדשה מתחילת החודש הנוכחי.
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {tiers.map((t) => { const winners = perClient.filter((c) => c.pts >= t.points); const isOpen = open === t.id; return (
          <div key={t.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "78px 1fr 1fr 92px 34px", gap: 8, alignItems: "end" }}>
              <TierIn label="נקודות" val={t.points} onChange={(v) => updateTier(t.id, "points", Math.max(1, +v))} />
              <TierTxt label="הפרס" val={t.title} onChange={(v) => updateTier(t.id, "title", v)} />
              <TierTxt label="פרט (יעד/מלון)" val={t.detail} onChange={(v) => updateTier(t.id, "detail", v)} placeholder="החודש: …" />
              <TierIn label="עלות ₪" val={t.cost || 0} onChange={(v) => updateTier(t.id, "cost", Math.max(0, +v))} />
              <button onClick={() => removeTier(t.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button>
            </div>
            <button onClick={() => setOpen(isOpen ? null : t.id)} style={{ marginTop: 8, border: "none", background: "transparent", cursor: "pointer", padding: 0 }}><Badge tone="plum">{winners.length} לקוחות הגיעו · {isOpen ? "הסתר" : "הצג"}</Badge></button>
            {isOpen && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>{winners.length === 0 ? <span style={{ fontSize: 12.5, color: C.sub }}>עדיין אף לקוח</span> : winners.map((w) => <Badge key={w.id} tone="green" icon={<Star size={11} fill={C.greenDeep} />}>{w.name} · {w.pts} נק'</Badge>)}</div>}
          </div>
        ); })}
      </div>
      <div style={{ marginTop: 14, padding: 12, background: C.amberSoft, borderRadius: 12, fontSize: 12.5, color: "#7A5A17", lineHeight: 1.6 }}>עלות הפרסים המשוערת לתקופה: <b>{NIS(prizeCost)}</b>.</div>
    </Panel>
  );
}
function MgrClients({ state, setState }) {
  const [open, setOpen] = useState(null); const [q, setQ] = useState(""); const [adding, setAdding] = useState(false);
  const pending = state.clients.filter((c) => c.status === "pending");
  const approve = (cid) => setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === cid ? { ...c, status: "active" } : c) }));
  const reject = (cid) => setState((s) => ({ ...s, clients: s.clients.filter((c) => c.id !== cid) }));
  const match = (c) => { if (!q.trim()) return true; const hay = (c.name + " " + c.phone + " " + c.taxId + " " + c.email).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const active = state.clients.filter((c) => c.status === "active" && match(c));
  return (
    <div style={{ display: "grid", gap: 20 }}>
      {pending.length > 0 && (
        <Panel style={{ borderColor: "#E4D3A8", background: "#FFFDF6", boxShadow: SH }}>
          <SectionTitle icon={<Clock size={18} />} extra={<Badge tone="amber">{pending.length}</Badge>}>בקשות הרשמת עסקים</SectionTitle>
          <div style={{ display: "grid", gap: 10 }}>{pending.map((c) => (<div key={c.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: 14, background: "#fff", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}><div style={{ flex: 1, minWidth: 200 }}><div style={{ fontWeight: 800 }}>{c.name}</div><div style={{ fontSize: 13, color: C.sub }}>{c.contact} · {c.phone} · {c.email}</div><div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}><Badge>{c.structure}</Badge><Badge>{c.category}</Badge><Badge icon={<PayIcon pay={c.pay} size={11} />}>{PAY[c.pay].label}</Badge></div></div><div style={{ display: "flex", gap: 8 }}><button onClick={() => approve(c.id)} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "9px 16px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><Check size={16} /> אשר</button><button onClick={() => reject(c.id)} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.red, fontWeight: 700, padding: "9px 14px", borderRadius: 10, cursor: "pointer", display: "flex", gap: 5, alignItems: "center" }}><X size={16} /> דחה</button></div></div>))}</div>
        </Panel>
      )}
      <Panel style={{ boxShadow: SH }}>
        <SectionTitle icon={<Users size={18} />} extra={<button onClick={() => setAdding(true)} style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${C.line}`, background: "#fff", color: C.green, fontWeight: 700, fontSize: 13, padding: "6px 12px", borderRadius: 9, cursor: "pointer" }}><UserPlus size={15} /> לקוח חדש</button>}>לקוחות</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: שם / טלפון / ח.פ / אימייל" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
        <div style={{ display: "grid", gap: 8 }}>
          {active.map((c) => { const pts = pointsOf(c.id, state.orders, state.products, state.kgPerPoint, state.periodMonths, state.periodAnchor); const prize = reachedTier(pts, sortTiers(state.prizeTiers)); const cnt = state.orders.filter((o) => o.clientId === c.id).length; const debt = outstandingOf(c.id, state.orders, state.products); return (
            <button key={c.id} onClick={() => setOpen(c)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>{c.name}</span><Badge tone="plum" icon={<Star size={12} fill={C.plum} />}>{pts} נק'</Badge></div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}><Badge icon={<Building2 size={11} />}>{c.structure}</Badge><Badge icon={<PayIcon pay={c.pay} size={11} />}>{PAY[c.pay].label}</Badge>{prize && <Badge tone="green" icon={<Trophy size={11} />}>{prize.title}</Badge>}<Badge>{cnt} הזמנות</Badge>{debt > 0 && <Badge tone="amber"><Wallet size={11} /> חוב {NIS(debt)}</Badge>}</div>
            </button>
          ); })}
          {active.length === 0 && <Empty>לא נמצאו לקוחות</Empty>}
        </div>
      </Panel>
      {open && <ClientModal client={open} state={state} setState={setState} onClose={() => setOpen(null)} />}
      {adding && <Modal onClose={() => setAdding(false)} title="הוספת לקוח חדש"><RegisterForm state={state} setState={setState} byManager onDone={() => setAdding(false)} back={() => setAdding(false)} /></Modal>}
    </div>
  );
}
function MgrStaff({ state, setState }) {
  const [f, setF] = useState({ name: "", role: "picker", email: "", password: "" }); const [err, setErr] = useState("");
  const [edit, setEdit] = useState(null);
  const add = () => { if (!f.name || !f.email || !f.password) return setErr("שם, אימייל וסיסמה חובה"); if ([...state.clients, ...state.staff].some((u) => u.email.trim().toLowerCase() === f.email.trim().toLowerCase())) return setErr("אימייל כבר קיים"); setState((s) => ({ ...s, staff: [...s.staff, { id: "u" + Date.now(), ...f }] })); setF({ name: "", role: "picker", email: "", password: "" }); setErr(""); };
  const del = (id) => setState((s) => ({ ...s, staff: s.staff.filter((x) => x.id !== id) }));
  const eset = (k) => (e) => setEdit((s) => ({ ...s, [k]: e.target.value }));
  const saveEdit = () => { if (!edit.name || !edit.email || !edit.password) return; setState((s) => ({ ...s, staff: s.staff.map((u) => u.id === edit.id ? edit : u) })); setEdit(null); };
  return (
    <Panel style={{ boxShadow: SH }}>
      <SectionTitle icon={<ShieldCheck size={18} />}>צוות · מלקטים, נהגים וסוכנים</SectionTitle>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>{state.staff.map((u) => (<div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", flexWrap: "wrap" }}><Badge tone={u.role === "agent" ? "plum" : u.role === "driver" ? "green" : "amber"}>{ROLE_LABEL[u.role]}</Badge>{(u.roles || []).map((r) => <Badge key={r}>+{ROLE_LABEL[r]}</Badge>)}<div style={{ flex: 1, minWidth: 140 }}><div style={{ fontWeight: 700 }}>{u.name}</div><div style={{ fontSize: 12, color: C.sub }}>{u.email}</div></div><button onClick={() => setEdit({ ...u })} style={miniBtn}><Pencil size={13} /> ערוך</button><button onClick={() => del(u.id)} style={{ border: "none", background: C.redSoft, color: C.red, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} /></button></div>))}</div>
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
        <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>פתיחת משתמש חדש לצוות</div>
        <div className="tp-staff" style={{ display: "grid", gap: 8, alignItems: "end" }}>
          <MiniField label="שם" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
          <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 3 }}>תפקיד</div><select value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} style={{ ...fieldStyle, padding: "8px" }}><option value="picker">מלקט</option><option value="driver">נהג</option><option value="agent">סוכן</option></select></label>
          <MiniField label="אימייל" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
          <MiniField label="סיסמה" value={f.password} onChange={(v) => setF({ ...f, password: v })} />
          <button onClick={add} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "10px 16px", borderRadius: 10, cursor: "pointer", height: 40 }}>הוסף</button>
        </div>
        {err && <ErrBox>{err}</ErrBox>}
      </div>
      {edit && <Modal onClose={() => setEdit(null)} title="עריכת חבר צוות">
        <Field label="שם" value={edit.name} onChange={eset("name")} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>תפקיד</div><select value={edit.role} onChange={eset("role")} style={fieldStyle}><option value="picker">מלקט</option><option value="driver">נהג</option><option value="agent">סוכן</option></select></label>
        <Field label="אימייל" value={edit.email} onChange={eset("email")} />
        <Field label="סיסמה" value={edit.password} onChange={eset("password")} />
        <div style={{ fontSize: 13, color: C.sub, margin: "6px 0 6px" }}>הצבת תפקידים נוספים</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>{["picker", "driver", "agent"].filter((r) => r !== edit.role).map((r) => { const on = (edit.roles || []).includes(r); return <button key={r} onClick={() => setEdit((s) => ({ ...s, roles: on ? (s.roles || []).filter((x) => x !== r) : [...(s.roles || []), r] }))} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.sub, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{ROLE_LABEL[r]}</button>; })}</div>
        <div style={{ fontSize: 12, color: C.sub, marginBottom: 12 }}>למשל: אם אין מלקט — אפשר להציב למנהל או לנהג גם את תפקיד המלקט. בכניסה הוא יבחר באיזה מסך לעבוד.</div>
        <SubmitBtn onClick={saveEdit}>שמור שינויים</SubmitBtn>
      </Modal>}
    </Panel>
  );
}
function MgrMessages({ state, setState }) {
  const [open, setOpen] = useState(null); const [bc, setBc] = useState(""); const [openQ, setOpenQ] = useState(null);
  const clients = state.clients.filter((c) => c.status === "active" || (c.status === "pending" && state.messages.some((m) => m.clientId === c.id)));
  const inquiries = [...(state.inquiries || [])].sort((a, b) => b.ts - a.ts);
  const sendBc = () => { if (!bc.trim()) return; setState((s) => ({ ...s, broadcasts: [{ id: "b" + Date.now(), text: bc.trim(), ts: Date.now() }, ...s.broadcasts] })); setBc(""); };
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<Megaphone size={18} />}>הודעה כללית / מבצע לכל הלקוחות</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}><input value={bc} onChange={(e) => setBc(e.target.value)} placeholder={"למשל: " + broadcastIdeas(state)[0]} style={{ ...fieldStyle, flex: 1 }} /><button onClick={sendBc} style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, padding: "0 18px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Send size={16} /> שלח</button></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10, alignItems: "center" }}><span style={{ fontSize: 12, color: C.sub, fontWeight: 700 }}>רעיונות מהמוצרים שלך:</span>{broadcastIdeas(state).map((t) => <button key={t} onClick={() => setBc(t)} style={{ border: `1px dashed ${C.green}`, background: "#fff", color: C.greenDeep, borderRadius: 16, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t}</button>)}</div>
        <div style={{ display: "grid", gap: 6, marginTop: 12 }}>{state.broadcasts.map((b) => <div key={b.id} style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 13 }}><b>{b.text}</b> <span style={{ color: C.sub, fontSize: 11 }}>· {dayStr(b.ts)}</span></div>)}</div>
      </Panel>
      {inquiries.length > 0 && <Panel style={{ boxShadow: SH, borderColor: "#D8D0F5", background: "#FBFAFF" }}><SectionTitle icon={<Mail size={18} />} extra={<Badge tone="plum">{inquiries.length}</Badge>}>פניות מעסקים שעוד לא לקוחות</SectionTitle>
        <div style={{ display: "grid", gap: 8 }}>{inquiries.map((q) => { const last = q.msgs[q.msgs.length - 1]; return (<button key={q.id} onClick={() => { setOpenQ(q); setState((s) => ({ ...s, inquiries: (s.inquiries || []).map((x) => x.id === q.id ? { ...x, unread: false } : x) })); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff", cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>{q.name}{q.unread && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.plum, display: "inline-block" }} />}</span>{last && <span style={{ fontSize: 11, color: C.sub }}>{dayStr(last.ts)}</span>}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{last ? last.text : ""}</div></button>); })}</div>
      </Panel>}
      <Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>שיחות עם לקוחות</SectionTitle>
        <div style={{ display: "grid", gap: 8 }}>{clients.map((c) => { const msgs = state.messages.filter((m) => m.clientId === c.id); const last = msgs[msgs.length - 1]; const unread = msgs.some((m) => m.fromRole === "client" && !m.readBySup); return (<button key={c.id} onClick={() => { setOpen(c); setState((s) => ({ ...s, messages: s.messages.map((m) => m.clientId === c.id && m.fromRole === "client" ? { ...m, readBySup: true } : m) })); }} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff", cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>{c.name}{c.status === "pending" && <Badge tone="amber">ממתין לאישור</Badge>}{unread && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.amber, display: "inline-block" }} />}</span>{last && <span style={{ fontSize: 11, color: C.sub }}>{dayStr(last.ts)}</span>}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{last ? last.text : "אין הודעות עדיין"}</div></button>); })}</div>
      </Panel>
      {open && <Modal onClose={() => setOpen(null)} title={"שיחה · " + open.name}><Chat state={state} setState={setState} clientId={open.id} meRole="manager" meName="מנהל" embedded /></Modal>}
      {openQ && <Modal onClose={() => setOpenQ(null)} title={"פנייה · " + openQ.name}><InquiryChat q={openQ} state={state} setState={setState} /></Modal>}
    </div>
  );
}
function PickerView({ state, setState, me }) {
  const [tab, setTab] = useState("home");
  const [open, setOpen] = useState(null);
  const queue = state.orders.filter((o) => o.status === "new").sort((a, b) => a.date - b.date);
  const picked = state.orders.filter((o) => o.pickedBy).sort((a, b) => b.date - a.date);
  const doneToday = state.orders.filter((o) => o.status !== "new" && new Date(o.date).toDateString() === new Date().toDateString()).length;
  const tabs = [["home", "בית", Home], ["queue", "ממתינות לליקוט", Scale], ["picked", "לוקטו", ClipboardCheck]];
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ queue: queue.length }} />
      {tab === "home" && <RoleHome sup={state} name={me ? me.name : "מלקט"} prompt="ליקוט ושקילת הזמנות" cards={[
        { id: "queue", title: "ממתינות לליקוט", desc: queue.length ? `${queue.length} הזמנות ממתינות` : "אין הזמנות לליקוט", Icon: Scale, tone: "amber", badge: queue.length ? queue.length + " ממתינות" : null },
        { id: "picked", title: "לוקטו", desc: `${picked.length} הזמנות שלוקטו`, Icon: ClipboardCheck, tone: "green" },
      ]} onOpen={setTab} />}
      {tab === "queue" && (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            <Kpi icon={<ClipboardList size={17} />} label="ממתינות לליקוט" value={queue.length} tone="amber" onClick={() => scrollToId("pk-queue")} hint="לתור הליקוט" />
            <Kpi icon={<ClipboardCheck size={17} />} label="לוקטו היום" value={doneToday} tone="green" onClick={() => setTab("picked")} hint="לרשימת מה שלוקט" />
          </div>
          <Panel style={{ boxShadow: SH }}><span id="pk-queue" style={{ display: "block", position: "relative", top: -90 }} /><SectionTitle icon={<Scale size={18} />}>תור ליקוט</SectionTitle>
            {queue.length === 0 ? <Empty>אין הזמנות לליקוט כרגע 🎉</Empty> : <div style={{ display: "grid", gap: 8 }}>{queue.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
              <button key={o.id} onClick={() => setOpen(o)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><span style={{ fontSize: 12, color: C.sub }}>{dayStr(o.date)}</span></div>
                <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
                <Badge tone="amber" icon={<Scale size={12} />}>לליקוט ושקילה · {orderCartons(o)} קרטונים</Badge>
              </button>
            ); })}</div>}
          </Panel>
        </div>
      )}
      {tab === "picked" && (
        <Panel style={{ boxShadow: SH }}><SectionTitle icon={<ClipboardCheck size={18} />} extra={<Badge tone="green">{picked.length}</Badge>}>הזמנות שלוקטו</SectionTitle>
          {picked.length === 0 ? <Empty>עדיין לא לוקטו הזמנות</Empty> : <div style={{ display: "grid", gap: 8 }}>{picked.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="green">{STATUS[o.status].label}</Badge></div>
              <div style={{ fontSize: 13, color: C.sub, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join("  ·  ")}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}><Badge icon={<Scale size={11} />}>ליקט: {o.pickedBy}</Badge><span style={{ fontSize: 12, color: C.sub }}>{dayStr(o.date)}</span><div style={{ flex: 1 }} /><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span></div>
            </div>
          ); })}</div>}
        </Panel>
      )}
      {open && <PickModal order={open} state={state} setState={setState} me={me} onClose={() => setOpen(null)} />}
    </div>
  );
}
function PickModal({ order, state, setState, onClose, me }) {
  const [supplied, setSupplied] = useState(() => { const o = {}; order.items.forEach((it) => { o[it.pid] = it.cartons; }); return o; });
  const [weights, setWeights] = useState(() => { const w = {}; order.items.forEach((it) => { const p = state.products.find((x) => x.id === it.pid); w[it.pid] = isPack(p) ? null : it.cartons * p.kg; }); return w; });
  const [checked, setChecked] = useState({});
  const c = state.clients.find((x) => x.id === order.clientId);
  const setSup = (pid, d, max) => { const p = state.products.find((x) => x.id === pid); const v = Math.max(0, Math.min(max, (supplied[pid] || 0) + d)); setSupplied((s) => ({ ...s, [pid]: v })); if (!isPack(p)) setWeights((w) => ({ ...w, [pid]: v * p.kg })); };
  const active = order.items.filter((it) => (supplied[it.pid] || 0) > 0);
  const allChecked = active.length > 0 && active.every((it) => checked[it.pid]);
  const total = order.items.reduce((s, it) => { const p = state.products.find((x) => x.id === it.pid); const eff = isPack(p) ? { ...it, supplied: supplied[it.pid] } : { ...it, supplied: supplied[it.pid], actualKg: +weights[it.pid] || 0 }; return s + lineTotal(eff, p); }, 0);
  const confirm = () => {
    const items = order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); const base = { ...it, supplied: supplied[it.pid] }; return isPack(p) ? base : { ...base, actualKg: Math.max(0, +weights[it.pid] || 0) }; });
    setState((s) => { const seq = (s.invoiceSeq || 1000) + 1; return { ...s, invoiceSeq: seq, orders: s.orders.map((o) => o.id === order.id ? { ...o, status: "picked", items, pickedBy: me ? me.name : "מלקט", invNo: o.invNo || seq } : o) }; });
    onClose();
  };
  return (
    <Modal onClose={onClose} title={"ליקוט · #" + order.id + " · " + (c ? c.name : "")}>
      <div style={{ display: "grid", gap: 10 }}>
        {order.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); const isC = isPack(p); const sup = supplied[it.pid] || 0; const short = it.cartons - sup; const gone = sup === 0; return (
          <div key={it.pid} style={{ border: `1px solid ${gone ? C.red : checked[it.pid] ? C.green : C.line}`, background: gone ? C.redSoft : checked[it.pid] ? C.greenSoft : "#fff", borderRadius: 12, padding: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <ProdThumb p={p} size={42} />
              <div style={{ flex: 1, minWidth: 120 }}><div style={{ fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 12, color: C.sub }}>הוזמנו {it.cartons} קרטונים{isC ? " (לפי קרטון)" : ` · ~${it.cartons * p.kg} ק"ג`}</div></div>
              {!gone && <button onClick={() => setChecked((x) => ({ ...x, [it.pid]: !x[it.pid] }))} style={{ border: "none", background: checked[it.pid] ? C.green : "#EEF1EC", color: checked[it.pid] ? "#fff" : C.sub, borderRadius: 10, width: 42, height: 42, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={20} /></button>}
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap", marginTop: 10 }}>
              <div><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>קרטונים שסופקו</div><div style={{ width: 118 }}><Stepper value={sup} onDec={() => setSup(it.pid, -1, it.cartons)} onInc={() => setSup(it.pid, 1, it.cartons)} maxed={sup >= it.cartons} /></div></div>
              {!isC && !gone && <label style={{ fontSize: 11, color: C.sub }}>משקל מדויק (ק"ג)<br /><input type="number" value={weights[it.pid] ?? ""} onChange={(e) => setWeights((w) => ({ ...w, [it.pid]: e.target.value }))} style={{ width: 90, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px", textAlign: "center", fontSize: 15, marginTop: 3 }} /></label>}
              {short > 0 && <Badge tone="amber"><AlertTriangle size={11} /> חסר {short} מהמלאי</Badge>}
            </div>
          </div>
        ); })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, fontWeight: 800 }}><span>סכום מחושב</span><span style={{ color: C.greenDeep, fontSize: 18 }}>{NIS(total)}</span></div>
      <button onClick={confirm} disabled={!allChecked} style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 12, border: "none", background: allChecked ? C.green : "#C9D3C7", color: "#fff", fontWeight: 800, fontSize: 15, cursor: allChecked ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> {allChecked ? "אשר ושמור · העבר לנהג" : "סמן את הפריטים שסופקו"}</button>
    </Modal>
  );
}
function DriverView({ state, setState, me }) {
  const [showDone, setShowDone] = useState(false);
  const [tab, setTab] = useState("home");
  const mine = state.orders.filter((o) => (o.status === "assigned" || o.status === "collected") && o.driverId === me.id).sort((a, b) => a.date - b.date);
  const done = state.orders.filter((o) => o.status === "delivered" && o.driverId === me.id);
  const setStatus = (oid, st) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, status: st } : o) }));
  const tabs = [["home", "בית", Home], ["deliveries", "המשלוחים שלי", Truck]];
  const doneTodayList = done.filter((o) => new Date(o.date).toDateString() === new Date().toDateString());
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} badges={{ deliveries: mine.length }} />
      {tab === "home" && <RoleHome sup={state} name={me.name} prompt="ניהול המשלוחים שלך" cards={[{ id: "deliveries", title: "המשלוחים שלי", desc: mine.length ? `${mine.length} משלוחים פעילים` : "אין משלוחים כרגע", Icon: Truck, tone: "plum", badge: mine.length ? mine.length + " פעילים" : null }]} onOpen={setTab} />}
      {tab === "deliveries" && (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            <Kpi icon={<Truck size={17} />} label="למשלוח" value={mine.length} tone="plum" onClick={() => { setShowDone(false); scrollToId("dv-list"); }} active={!showDone} hint="למשלוחים שלי" />
            <Kpi icon={<Check size={17} />} label="נמסרו היום" value={doneTodayList.length} tone="green" onClick={() => { setShowDone(true); scrollToId("dv-done"); }} active={showDone} hint="מה נמסר היום" />
          </div>
          {showDone && <Panel style={{ boxShadow: SH }}><span id="dv-done" style={{ display: "block", position: "relative", top: -90 }} /><SectionTitle icon={<Check size={18} />} extra={<button onClick={() => setShowDone(false)} style={{ border: "none", background: "transparent", color: C.sub, cursor: "pointer", display: "flex" }}><X size={16} /></button>}>נמסרו היום</SectionTitle>
            {doneTodayList.length === 0 ? <Empty>עוד לא נמסרו משלוחים היום</Empty> : <div style={{ display: "grid", gap: 8 }}>{doneTodayList.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}><span style={{ fontWeight: 700 }}>{c ? c.name : "לקוח"} <span style={{ color: C.sub, fontWeight: 500, fontSize: 12 }}>#{o.id}</span></span><span style={{ fontSize: 12.5, color: C.sub }}>{c && c.address}</span><Badge tone="green"><Check size={11} /> נמסר</Badge></div>; })}</div>}
          </Panel>}
          <Panel style={{ boxShadow: SH }}><span id="dv-list" style={{ display: "block", position: "relative", top: -90 }} /><SectionTitle icon={<MapPin size={18} />}>המשלוחים שלי</SectionTitle>
            {mine.length === 0 ? <Empty>אין משלוחים משובצים כרגע</Empty> : <div style={{ display: "grid", gap: 8 }}>{mine.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); return (
              <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="plum">{STATUS[o.status].label}</Badge></div>
                <div style={{ fontSize: 13, color: C.ink, margin: "6px 0", display: "grid", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} color={C.green} /> {c?.address || "אין כתובת"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} color={C.green} /> {c?.contact} · {c?.phone}</div>
                </div>
                {o.status === "assigned" ? <button onClick={() => setStatus(o.id, "collected")} style={dvBtn(C.blue)}><Package size={16} /> אספתי מהמחסן</button> : <button onClick={() => setStatus(o.id, "delivered")} style={dvBtn(C.green)}><Check size={16} /> נמסר ללקוח · בוצע</button>}
              </div>
            ); })}</div>}
          </Panel>
        </div>
      )}
    </div>
  );
}
const dvBtn = (bg) => ({ width: "100%", border: "none", background: bg, color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 });
function AgentView({ state, setState, me }) {
  const [tab, setTab] = useState("home"); const [chatClient, setChatClient] = useState(null); const [orderClient, setOrderClient] = useState("");
  const [q, setQ] = useState(""); const [edit, setEdit] = useState(null); const [view, setView] = useState(null); const [cq, setCq] = useState("");
  const clients = state.clients.filter((c) => c.status === "active");
  const tabs = [["home", "בית", Home], ["orders", "מעקב הזמנות", ClipboardList], ["new", "הזמנה ללקוח", ShoppingCart], ["chat", "תמיכה בלקוחות", MessageSquare]];
  const match = (o) => { if (!q.trim()) return true; const c = state.clients.find((x) => x.id === o.clientId); const hay = (o.id + " " + (c ? c.name + " " + c.phone + " " + c.taxId : "") + " " + dayStr(o.date)).toLowerCase(); return hay.includes(q.trim().toLowerCase()); };
  const orders = [...state.orders].sort((a, b) => b.date - a.date).filter(match);
  return (
    <div><Tabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === "home" && <RoleHome sup={state} name={me.name} prompt="מרכז הסוכן" cards={[
        { id: "orders", title: "מעקב הזמנות", desc: "כל ההזמנות במערכת", Icon: ClipboardList, tone: "blue" },
        { id: "new", title: "הזמנה ללקוח", desc: "צור הזמנה עבור לקוח", Icon: ShoppingCart, tone: "green" },
        { id: "chat", title: "תמיכה בלקוחות", desc: "שיחות ופניות לקוחות", Icon: MessageSquare, tone: "amber" },
      ]} onOpen={setTab} />}
      {tab === "orders" && (
        <Panel style={{ boxShadow: SH }}><SectionTitle icon={<ClipboardList size={18} />}>כל ההזמנות</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 12 }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: מס' הזמנה / לקוח / טלפון / ח.פ" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
          <div style={{ display: "grid", gap: 8 }}>{orders.map((o) => { const c = state.clients.find((x) => x.id === o.clientId); const st = STATUS[o.status]; return (
            <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700 }}>#{o.id} · {c?.name}</span><Badge tone="green">{st.label}</Badge></div><div style={{ fontSize: 13, color: C.sub, margin: "4px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join(" · ")} · <b style={{ color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</b></div><div style={{ display: "flex", gap: 6 }}><button onClick={() => setView(o)} style={miniBtn}><Receipt size={13} /> צפייה</button>{o.status === "new" && <button onClick={() => setEdit(o)} style={{ ...miniBtn, color: C.blue, borderColor: C.blue }}><Pencil size={13} /> שינוי</button>}</div></div>
          ); })}{orders.length === 0 && <Empty>לא נמצאו הזמנות</Empty>}</div>
        </Panel>
      )}
      {tab === "new" && (
        <div style={{ display: "grid", gap: 16 }}>
          <Panel style={{ boxShadow: SH }}>
            <SectionTitle icon={<Users size={18} />}>בחר לקוח</SectionTitle>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, borderRadius: 10, padding: "0 10px", marginBottom: 10, maxWidth: 440 }}><Search size={15} color={C.sub} /><input value={cq} onChange={(e) => setCq(e.target.value)} placeholder="חיפוש לקוח: שם / טלפון / ח.פ / אימייל" style={{ border: "none", outline: "none", padding: "9px 4px", fontSize: 13, width: "100%", fontFamily: "inherit", background: "transparent" }} /></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{clients.filter((c) => { const h = (c.name + " " + c.phone + " " + c.taxId + " " + c.email).toLowerCase(); return h.includes(cq.trim().toLowerCase()); }).map((c) => { const on = orderClient === c.id; return <button key={c.id} onClick={() => setOrderClient(c.id)} style={{ border: `1.5px solid ${on ? C.green : C.line}`, background: on ? C.greenSoft : "#fff", color: on ? C.greenDeep : C.ink, borderRadius: 12, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>{c.name}<span style={{ color: C.sub, fontWeight: 500, fontSize: 11 }}> · {c.phone}</span></button>; })}</div>
          </Panel>
          {orderClient && <OrderForm state={state} setState={setState} clientId={orderClient} agentName={me.name} />}
        </div>
      )}
      {tab === "chat" && (chatClient
        ? <div><button onClick={() => setChatClient(null)} style={{ border: "none", background: "transparent", color: C.green, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}><ChevronLeft size={16} /> חזרה</button><Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>{state.clients.find((c) => c.id === chatClient)?.name}</SectionTitle><Chat state={state} setState={setState} clientId={chatClient} meRole="agent" meName={me.name} embedded /></Panel></div>
        : <Panel style={{ boxShadow: SH }}><SectionTitle icon={<MessageSquare size={18} />}>פניות לקוחות</SectionTitle><div style={{ display: "grid", gap: 8 }}>{clients.map((c) => { const msgs = state.messages.filter((m) => m.clientId === c.id); const last = msgs[msgs.length - 1]; return <button key={c.id} onClick={() => setChatClient(c.id)} style={{ textAlign: "right", border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff", cursor: "pointer" }}><div style={{ fontWeight: 700 }}>{c.name}</div><div style={{ fontSize: 13, color: C.sub, marginTop: 3 }}>{last ? last.text : "אין הודעות"}</div></button>; })}</div></Panel>
      )}
      {edit && <EditOrder order={edit} state={state} setState={setState} onClose={() => setEdit(null)} />}
      {view && <InvoiceModal order={view} state={state} onClose={() => setView(null)} withAddress />}
    </div>
  );
}
function Chat({ state, setState, clientId, meRole, meName, embedded }) {
  const [text, setText] = useState("");
  const msgs = state.messages.filter((m) => m.clientId === clientId).sort((a, b) => a.ts - b.ts);
  const send = () => { if (!text.trim()) return; setState((s) => ({ ...s, messages: [...s.messages, { id: "m" + Date.now(), clientId, fromRole: meRole, fromName: meName, text: text.trim(), ts: Date.now() }] })); setText(""); };
  const mine = (m) => m.fromRole === meRole;
  return (
    <div>
      {!embedded && meRole === "client" && state.broadcasts.length > 0 && <div style={{ marginBottom: 12 }}>{state.broadcasts.slice(0, 2).map((b) => <div key={b.id} style={{ background: C.amberSoft, color: "#7A5A17", borderRadius: 10, padding: "8px 12px", fontSize: 13, marginBottom: 6, display: "flex", gap: 6, alignItems: "center" }}><Megaphone size={15} /> <b>{b.text}</b></div>)}</div>}
      <div style={{ background: embedded ? "transparent" : C.surface, border: embedded ? "none" : `1px solid ${C.line}`, borderRadius: 16, padding: embedded ? 0 : 16, boxShadow: embedded ? "none" : SH }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflow: "auto", marginBottom: 12, padding: 4 }}>
          {msgs.length === 0 && <Empty>אין הודעות עדיין.</Empty>}
          {msgs.map((m) => (<div key={m.id} style={{ alignSelf: mine(m) ? "flex-start" : "flex-end", maxWidth: "82%" }}><div style={{ background: mine(m) ? C.green : "#EEF1EC", color: mine(m) ? "#fff" : C.ink, borderRadius: 14, padding: "8px 12px", fontSize: 14 }}>{m.text}</div><div style={{ fontSize: 10.5, color: C.sub, marginTop: 3, textAlign: mine(m) ? "right" : "left" }}>{m.fromRole !== meRole ? (ROLE_LABEL[m.fromRole] || "") + " · " : ""}{dayStr(m.ts)}</div></div>))}
        </div>
        <div style={{ display: "flex", gap: 8 }}><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="כתוב הודעה…" style={{ ...fieldStyle, flex: 1 }} /><button onClick={send} style={{ border: "none", background: C.green, color: "#fff", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={17} /></button></div>
      </div>
    </div>
  );
}
function ClientModal({ client, state, setState, onClose }) {
  const [inv, setInv] = useState(null);
  const [editing, setEditing] = useState(false);
  const [f, setF] = useState(client);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const saveEdit = () => { setState((s) => ({ ...s, clients: s.clients.map((c) => c.id === client.id ? { ...c, ...f, target: +f.target || c.target } : c) })); setEditing(false); };
  const orders = state.orders.filter((o) => o.clientId === client.id).sort((a, b) => b.date - a.date);
  const m = monthOrdersOf(client.id, orders); const monthTotal = m.reduce((s, o) => s + orderTotal(o, state.products), 0);
  const pts = pointsOf(client.id, state.orders, state.products, state.kgPerPoint, state.periodMonths, state.periodAnchor); const prize = reachedTier(pts, sortTiers(state.prizeTiers));
  const debt = outstandingOf(client.id, state.orders, state.products);
  const markPaid = (oid) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === oid ? { ...o, paid: true } : o) }));
  if (editing) return (
    <Modal onClose={onClose} title={"עריכת פרטים · " + client.name}>
      <div className="tp-2eq" style={{ display: "grid", gap: 10 }}>
        <Field label="שם העסק" value={f.name || ""} onChange={set("name")} />
        <Field label="איש קשר" value={f.contact || ""} onChange={set("contact")} />
        <Field label="טלפון" value={f.phone || ""} onChange={set("phone")} />
        <Field label="כתובת" value={f.address || ""} onChange={set("address")} />
        <Field label="אימייל" value={f.email || ""} onChange={set("email")} />
        <Field label="מספר עוסק / ח.פ" value={f.taxId || ""} onChange={set("taxId")} />
        <Field label="סיסמה" value={f.password || ""} onChange={set("password")} />
        <Field label="יעד חודשי (נק')" type="number" value={f.target} onChange={set("target")} />
        <Select label="סוג התאגדות" value={f.structure} onChange={set("structure")} options={STRUCTURES} />
        <Select label="סוג העסק" value={f.category} onChange={set("category")} options={CATEGORIES} />
        <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>אופן תשלום</div><select value={f.pay} onChange={set("pay")} style={fieldStyle}><option value="cash">מזומן</option><option value="credit">אשראי</option><option value="check">צ'ק</option></select></label>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <button onClick={saveEdit} style={{ flex: 1, border: "none", background: C.green, color: "#fff", fontWeight: 800, padding: 12, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Save size={16} /> שמור שינויים</button>
        <button onClick={() => { setF(client); setEditing(false); }} style={{ border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, padding: "12px 18px", borderRadius: 12, cursor: "pointer" }}>ביטול</button>
      </div>
    </Modal>
  );
  return (
    <Modal onClose={onClose} title={client.name}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Badge tone="plum" icon={<Star size={12} fill={C.plum} />}>{pts} נק'</Badge>{prize && <Badge tone="green" icon={<Trophy size={12} />}>{prize.title}</Badge>}<Badge icon={<PayIcon pay={client.pay} size={11} />}>{PAY[client.pay].label}</Badge>{debt > 0 && <Badge tone="amber"><Wallet size={11} /> חוב {NIS(debt)}</Badge>}</div>
        <button onClick={() => setEditing(true)} style={miniBtn}><Pencil size={13} /> ערוך פרטים</button>
      </div>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{client.contact} · {client.phone} · {client.email}</div>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 8, display: "flex", gap: 5, alignItems: "center" }}><MapPin size={13} /> {client.address || "אין כתובת"} · ח.פ {client.taxId || "—"}</div>
      {(client.docs || []).length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{client.docs.map((d, i) => <Badge key={i} icon={<FileText size={11} />}>{d}</Badge>)}</div>}
      <div style={{ background: C.greenSoft, borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 14 }}><b>סיכום {monthName}:</b> {m.length} הזמנות · סה"כ {NIS(monthTotal)}</div>
      <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>כל ההזמנות</div>
      <div style={{ display: "grid", gap: 8, maxHeight: 260, overflow: "auto" }}>{orders.map((o) => (
        <div key={o.id} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 14px", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, color: C.sub }}>#{o.id} · {dayStr(o.date)}</span><Badge tone="green">{STATUS[o.status].label}</Badge></div>
          <div style={{ fontSize: 13, margin: "5px 0" }}>{o.items.map((it) => { const p = state.products.find((x) => x.id === it.pid); return `${p?.name}×${it.cartons}`; }).join(" · ")}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6, flexWrap: "wrap" }}><div style={{ display: "flex", gap: 6 }}><button onClick={() => setInv(o)} style={miniBtn}><Receipt size={13} /> חשבונית</button>{o.status === "delivered" && (o.paid ? <Badge tone="green"><Check size={11} /> שולם{o.paidMethod ? " · " + (PAY[o.paidMethod] || PAY.cash).label : ""}{o.checkDue ? " · צ'ק ל-" + new Date(o.checkDue).toLocaleDateString("he-IL") : ""}</Badge> : <button onClick={() => setPayMark(o)} style={{ ...miniBtn, color: C.amber, borderColor: C.amber }}><Wallet size={13} /> סמן כשולם</button>)}</div><span style={{ fontWeight: 800, color: C.greenDeep }}>{NIS(orderTotal(o, state.products))}</span></div>
        </div>
      ))}</div>
      {inv && <InvoiceModal order={inv} state={state} onClose={() => setInv(null)} withAddress />}
    </Modal>
  );
}

/* ============ UI primitives ============ */
function Tabs({ tabs, active, onChange, badges = {} }) {
  return (<div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
    {tabs.map(([id, label, Icon]) => { const on = active === id; const b = badges[id]; return (
      <button key={id} onClick={() => onChange(id)} style={{ display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", border: `1px solid ${on ? C.green : C.line}`, background: on ? C.green : "#fff", color: on ? "#fff" : C.sub, fontWeight: 700, fontSize: 14, padding: "9px 15px", borderRadius: 11, cursor: "pointer", boxShadow: on ? "0 3px 10px rgba(31,122,77,.25)" : "none" }}>
        <Icon size={16} />{label}{b ? <span style={{ background: on ? "rgba(255,255,255,.25)" : C.amber, color: "#fff", borderRadius: 20, fontSize: 11, padding: "1px 7px", fontWeight: 800 }}>{b}</span> : null}
      </button>
    ); })}
  </div>);
}
function Modal({ title, children, onClose }) {
  return (<div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,40,30,.45)", zIndex: 50, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflow: "auto" }}>
    <div dir="rtl" onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, padding: 22, width: "100%", maxWidth: 580, boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}><h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, flex: 1 }}>{title}</h2><button onClick={onClose} style={{ border: "none", background: "#EEF1EC", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: C.sub, display: "flex", alignItems: "center", justifyContent: "center" }}><X size={17} /></button></div>
      {children}
    </div>
  </div>);
}
function PayIcon({ pay, size = 12 }) { const I = (PAY[pay] || PAY.cash).icon; return <I size={size} />; }
function ProdIcon({ p, s = 26 }) {
  const M = {
    p1: (<g><circle cx="12" cy="14.5" r="7.5" fill="#E4572E" /><path d="M12 7.2c-1.2-1.5-3.3-1.9-3.3-1.9.4 1.7 1.6 2.7 3.3 2.7z" fill="#3E9E52" /><path d="M12 7.2c1.2-1.5 3.3-1.9 3.3-1.9-.4 1.7-1.6 2.7-3.3 2.7z" fill="#3E9E52" /><path d="M12 4.6v3" stroke="#3E9E52" strokeWidth="1.3" strokeLinecap="round" /><circle cx="9.5" cy="12.5" r="1.6" fill="#fff" opacity=".38" /></g>),
    p2: (<g><rect x="6" y="5" width="7" height="15" rx="3.5" transform="rotate(30 9.5 12.5)" fill="#4E9A45" /><rect x="8" y="7" width="1.4" height="11" rx=".7" transform="rotate(30 9.5 12.5)" fill="#77BE64" opacity=".7" /></g>),
    p3: (<g><path d="M12 6c4 0 6 3.5 6 7.5s-2.6 6.5-6 6.5-6-2.5-6-6.5S8 6 12 6z" fill="#CBA76E" /><path d="M9 8c-.5 3-.5 9 0 12M15 8c.5 3 .5 9 0 12" stroke="#A57F44" strokeWidth=".8" fill="none" opacity=".6" /><path d="M12 6c0-2 1.4-3 1.4-3M12 6c0-2-1.4-3-1.4-3" stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round" /></g>),
    p4: (<g><ellipse cx="12" cy="13" rx="8" ry="6.4" fill="#BB8E57" /><circle cx="9" cy="11" r="1" fill="#8A6636" /><circle cx="14.5" cy="14" r="1" fill="#8A6636" /><circle cx="12" cy="10" r=".7" fill="#8A6636" /></g>),
    p5: (<g><ellipse cx="12" cy="13" rx="8" ry="6" fill="#F2CE1B" /><ellipse cx="9.5" cy="11" rx="2" ry="1.2" fill="#fff" opacity=".35" /></g>),
    p6: (<g><path d="M8 8.5c-2 1-3 4-3 7 0 3 2 5 3.8 5 1.2 0 1.7-.8 3.2-.8s2 .8 3.2.8c1.8 0 3.8-2 3.8-5 0-3-1-6-3-7-1.6-.8-3 0-3 0s-1.4-.8-3 0z" fill="#D33B34" /><path d="M12 6.5v-2.5" stroke="#3E9E52" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 5c1-1 3-1 3-1" stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round" fill="none" /></g>),
    p7: (<g><circle cx="12" cy="13" r="8" fill="#7CC950" /><path d="M5 12c3-1 5-1 7 0M7 16c3-1 6-1 8 0M6 9c3-1 7-1 10 0" stroke="#5AAE38" strokeWidth="1" fill="none" opacity=".7" /></g>),
    p8: (<g><path d="M6 20l1.2-6h9.6l1.2 6z" fill="#5AAE38" /><circle cx="12" cy="10" r="6.5" fill="#F1F4EC" /><circle cx="9.2" cy="9.2" r="2.3" fill="#fff" /><circle cx="13" cy="8.2" r="2.3" fill="#fff" /><circle cx="15" cy="11" r="2.3" fill="#fff" /><circle cx="11" cy="12" r="2.3" fill="#fff" /></g>),
    p9: (<g><path d="M12 21 L8 8 L16 8 Z" fill="#E8730E" /><g stroke="#3E9E52" strokeWidth="1.4" strokeLinecap="round"><path d="M12 8V3.5" /><path d="M9 8L7 4.5" /><path d="M15 8l2-3.5" /></g></g>),
  };
  const g = M[p.id];
  if (!g) return <span style={{ fontSize: s * 0.6 }}>{p.emoji}</span>;
  return <svg width={s} height={s} viewBox="0 0 24 24">{g}</svg>;
}
function ProdThumb({ p, size = 46, tint }) {
  if (p.img) return <img src={p.img} alt={p.name} style={{ width: size, height: size, borderRadius: 12, objectFit: "cover" }} />;
  return <div style={{ width: size, height: size, borderRadius: 12, background: tint ? tint + "1A" : "#F2F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><ProdIcon p={p} s={Math.round(size * 0.64)} /></div>;
}
function Panel({ children, pad = 20, style = {} }) { return <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: pad, ...style }}>{children}</div>; }
function SectionTitle({ icon, children, extra }) { return <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}><span style={{ color: C.green, display: "flex" }}>{icon}</span><h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>{children}</h2><div style={{ flex: 1 }} />{extra}</div>; }
function Stepper({ value, onDec, onInc, maxed, accent }) { const ac = accent || C.greenDeep; return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}><button onClick={onDec} style={stepBtn}><Minus size={16} /></button><span style={{ fontWeight: 800, minWidth: 22, textAlign: "center" }}>{value}</span><button onClick={onInc} disabled={maxed} style={{ ...stepBtn, background: maxed ? "#F0F0F0" : ac + "18", color: maxed ? "#B7BDB4" : ac, cursor: maxed ? "default" : "pointer" }}><Plus size={16} /></button></div>; }
const stepBtn = { border: "none", background: "#fff", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", color: C.sub };
const miniBtn = { border: `1px solid ${C.line}`, background: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: C.sub, display: "inline-flex", alignItems: "center", gap: 4 };
const kpiBtn = (on) => ({ border: "none", background: "transparent", padding: 0, cursor: "pointer", textAlign: "right", outline: on ? `2px solid ${C.green}` : "none", borderRadius: 18 });
function Kpi({ icon, label, value, tone, bare, onClick, active, hint }) { const map = { green: [C.greenSoft, C.greenDeep], amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum], red: [C.redSoft, C.red], blue: [C.blueSoft, C.blue] }; const [bg, fg] = map[tone] || ["#EEF1EC", C.ink]; const inner = <><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 11, background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div><div style={{ fontSize: 12.5, color: C.sub, flex: 1 }}>{label}</div>{onClick && <ChevronLeft size={16} color={C.sub} />}</div><div style={{ fontWeight: 800, fontSize: 22, marginTop: 8, color: fg }}>{value}</div>{onClick && hint && <div style={{ fontSize: 11.5, color: C.blue, fontWeight: 700, marginTop: 2 }}>{hint}</div>}</>;
  if (onClick) return <button onClick={onClick} className="tp-click" style={{ display: "block", width: "100%", textAlign: "right", font: "inherit", color: "inherit", cursor: "pointer", background: C.surface, border: `1px solid ${active ? C.green : C.line}`, outline: active ? `2px solid ${C.green}` : "none", borderRadius: 18, padding: 15, boxShadow: SH }}>{inner}</button>;
  return bare ? <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 18, padding: 15, boxShadow: SH }}>{inner}</div> : <Panel pad={15} style={{ boxShadow: SH }}>{inner}</Panel>; }
const scrollToId = (id) => { setTimeout(() => { const el = document.getElementById(id); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); };
function Badge({ children, tone, icon }) { const map = { green: [C.greenSoft, C.greenDeep], amber: [C.amberSoft, C.amber], plum: [C.plumSoft, C.plum] }; const [bg, fg] = map[tone] || ["#EEF1EC", C.sub]; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: bg, color: fg, borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>{icon}{children}</span>; }
function Empty({ children }) { return <div style={{ color: C.sub, fontSize: 14, textAlign: "center", padding: "18px 0" }}>{children}</div>; }
function Th({ children }) { return <th style={{ padding: "6px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>{children}</th>; }
function Td({ children, strong, color }) { return <td style={{ padding: "8px", fontWeight: strong ? 800 : 400, color: color || C.ink }}>{children}</td>; }
const fieldStyle = { width: "100%", border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 11px", fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", background: "#fff", color: C.ink };
function Field({ label, ...p }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{label}</div><input style={fieldStyle} {...p} /></label>; }
function MiniField({ label, value, onChange }) { return <label style={{ display: "block" }}><div style={{ fontSize: 12, color: C.sub, marginBottom: 3 }}>{label}</div><input value={value} onChange={(e) => onChange(e.target.value)} style={{ ...fieldStyle, padding: "8px 10px" }} /></label>; }
function Select({ label, options, ...p }) { return <label style={{ display: "block", marginBottom: 10 }}><div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{label}</div><select style={fieldStyle} {...p}>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select></label>; }
function SubmitBtn({ onClick, children }) { return <button onClick={onClick} style={{ width: "100%", marginTop: 8, padding: 12, borderRadius: 12, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>{children}</button>; }
function BigBtn({ icon, children, onClick, primary }) { return <button onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: 14, border: primary ? "none" : `1.5px solid ${C.line}`, background: primary ? C.green : "#fff", color: primary ? "#fff" : C.ink, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: primary ? "0 4px 14px rgba(31,122,77,.3)" : "none" }}>{icon}{children}</button>; }
function SmallBtn({ children, onClick }) { return <button onClick={onClick} style={{ flex: "1 0 28%", padding: "9px", borderRadius: 10, border: `1px solid ${C.line}`, background: "#fff", color: C.sub, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{children}</button>; }
function ErrBox({ children }) { return <div style={{ background: C.redSoft, color: C.red, padding: "9px 12px", borderRadius: 10, fontSize: 13, marginTop: 8, fontWeight: 600 }}>{children}</div>; }
function LabIn({ label, val, onChange, step }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input type="number" step={step} value={Math.round((val + Number.EPSILON) * 100) / 100} onChange={(e) => onChange(+e.target.value)} style={{ width: 78, border: `1px solid ${C.line}`, borderRadius: 8, padding: "6px", textAlign: "center", fontSize: 14 }} /></label>; }
function TierIn({ label, val, onChange }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input type="number" value={val} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 6px", textAlign: "center", fontSize: 14 }} /></label>; }
function TierTxt({ label, val, onChange, placeholder }) { return <label style={{ display: "block" }}><div style={{ fontSize: 11, color: C.sub, marginBottom: 3 }}>{label}</div><input value={val} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 8px", fontSize: 14, fontFamily: "inherit" }} /></label>; }
