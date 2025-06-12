(function () {
  if (document.getElementById("mini-ia-panel")) return;

  /* Estilos */
  const style = document.createElement("style");
  style.innerHTML = `
    #mini-ia-panel { position:fixed; right:0; top:0; width:320px; height:100vh;
      background:white; border-left:2px solid #ccc;
      box-shadow:-2px 0 10px rgba(0,0,0,0.2);
      display:flex; flex-direction:column; font-family:sans-serif;
      z-index:9999;
    }
    #mini-ia-panel textarea { flex:0 0 120px; margin:10px;
      width:calc(100% - 20px); resize:none;
    }
    #mini-ia-panel button { margin:5px 10px; }
    #mini-ia-panel .output { flex:1; margin:10px;
      overflow-y:auto; background:#f9f9f9; padding:8px;
    }
  `;
  document.head.appendChild(style);

  /* Estrutura */
  const panel = document.createElement("div");
  panel.id = "mini-ia-panel";
  panel.innerHTML = `
    <textarea id="ia-question" placeholder="Digite sua pergunta..."></textarea>
    <button id="ia-ask">Perguntar</button>
    <div class="output" id="ia-answer">Resposta aparecerá aqui...</div>
  `;
  document.body.appendChild(panel);

  /* Lógica */
  document.getElementById("ia-ask").onclick = async () => {
    const q = document.getElementById("ia-question").value;
    const out = document.getElementById("ia-answer");
    out.innerText = "Carregando...";

    try {
      const res = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer f92cd176916d4df7b9afb6f55d7a0536",
        },
        body: JSON.stringify({
          model: "openai/o4-mini-2025-04-16",
          messages: [{ role: "user", content: q }]
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "[sem resposta]";
      out.innerText = text;
    } catch (e) {
      out.innerText = "Erro: " + e.message;
    }
  };
})();
