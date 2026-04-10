# Detailed Notes on `useEffect` Cleanup

`useEffect` cleanup is one of the most important React concepts because it teaches you **how to stop side effects properly**.

A lot of developers learn `useEffect` like this:

```jsx
useEffect(() => {
  // do something
}, [])
```

But the real skill is this:

```jsx
useEffect(() => {
  // start something

  return () => {
    // stop / undo that thing
  }
}, [])
```

That `return` function is the **cleanup function**.

React’s official guidance is simple: cleanup should **stop or undo whatever the effect started**, and the user should not be able to tell whether React ran `setup` once or ran `setup → cleanup → setup` during development. That is especially important in Strict Mode, where React intentionally runs an extra setup/cleanup cycle in development to expose bad side effects early. ([React][1])

---

# 1. First, what is an Effect?

An Effect is code that runs **after React has rendered** and is used to synchronize your component with something **outside React**:

* browser APIs
* timers
* network requests
* event listeners
* subscriptions
* sockets
* third-party libraries
* DOM manipulation

React explicitly says Effects are an **escape hatch** for syncing with external systems, and that many things people write in `useEffect` should not be effects at all. Unnecessary effects make code slower, harder to follow, and more error-prone. ([React][2])

So before cleanup, understand this:

> `useEffect` is for external synchronization.
> Cleanup is for **detaching** from that external synchronization.

---

# 2. What exactly is cleanup?

Cleanup is the function returned from an effect:

```jsx
useEffect(() => {
  console.log("Effect started")

  return () => {
    console.log("Cleanup ran")
  }
}, [])
```

React runs cleanup in mainly two situations:

## A. Before the effect runs again

If dependencies change:

```jsx
useEffect(() => {
  console.log("Subscribed to room:", roomId)

  return () => {
    console.log("Unsubscribed from room:", roomId)
  }
}, [roomId])
```

If `roomId` changes from `general` to `random`, React does:

1. cleanup old effect
2. run new effect

So React is basically saying:

> “Before I start the new side effect, let me remove the old one.”

## B. When the component unmounts

If the component disappears from UI, cleanup runs so that timers, listeners, subscriptions, requests, etc. don’t keep living after the component is gone. ([React][1])

---

# 3. Why cleanup matters

Without cleanup, you usually get one or more of these problems:

* duplicate event listeners
* multiple intervals running
* stale subscriptions
* race conditions in async code
* memory leaks
* UI updating with old data
* “ghost behavior” after component is gone

Important nuance: React 18 removed the old warning about setting state on an unmounted component because it was often misleading, not because cleanup became unimportant. React’s official upgrade guide says that warning was removed since people mostly hit it in scenarios where the warning was not actually a real leak. ([React][3])

So the modern idea is:

> Don’t depend on warnings.
> Write effects so they clean up correctly by design.

---

# 4. The mental model you should teach

This is the cleanest way to think about it:

## `useEffect` = “connect”

## cleanup = “disconnect”

If your effect does one of these:

* subscribe
* attach
* start
* open
* schedule
* fetch
* register

Then your cleanup should do the opposite:

* unsubscribe
* detach
* stop
* close
* cancel
* abort
* unregister

That’s the real pattern.

---

# 5. The most basic powerful example: event listener

## Without cleanup

```jsx
import { useEffect, useState } from "react";

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      console.log("resize listener fired");
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return <h1>Width: {width}</h1>;
}
```

### Problem

When the component unmounts, the listener is still attached.

If the component mounts again, another listener gets attached.

Now you may have:

* duplicate listeners
* extra renders
* weird logs
* growing memory usage

## With cleanup

```jsx
import { useEffect, useState } from "react";

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      console.log("resize listener fired");
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <h1>Width: {width}</h1>;
}
```

This is correct because the cleanup mirrors setup.

MDN confirms `removeEventListener()` removes a listener previously attached with `addEventListener()`, and listener matching matters. ([MDN Web Docs][4])

---

# 6. Timer example: `setInterval`

This is one of the best teaching demos.

## Without cleanup

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Timer started");

    const id = setInterval(() => {
      console.log("Tick");
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);

  return <h1>Count: {count}</h1>;
}
```

### What goes wrong?

If this component is removed and mounted again:

* old interval may still run
* new interval starts too
* now count may jump strangely
* logs multiply

## With cleanup

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Timer started");

    const id = setInterval(() => {
      console.log("Tick");
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("Timer stopped");
      clearInterval(id);
    };
  }, []);

  return <h1>Count: {count}</h1>;
}
```

### Real lesson

The effect **started a repeating external process**, so cleanup must **stop it**.

---

# 7. Chat room / subscription example

This is very close to React’s official teaching style.

## Without cleanup

```jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
}, [roomId]);
```

### Problem

If `roomId` changes:

* old room connection stays alive
* new room connection is created
* now you may receive duplicate messages
* sockets stay open unnecessarily

## Correct version

```jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();

  return () => {
    connection.disconnect();
  };
}, [roomId]);
```

### Why this is great

It demonstrates the exact rule:

* setup: `connect()`
* cleanup: `disconnect()`

That is the purest `useEffect` cleanup example.

React docs use this same “mirror your setup” logic as the core guidance. ([React][1])

---

# 8. Fetch example: where cleanup becomes serious

A lot of beginners think cleanup is only for timers and listeners.

No.

It is extremely important for async flows.

## The real-world bug

User opens product page A.
Request for A starts.
Before it finishes, user quickly opens product page B.
Request for B starts.
Now A finishes late and overwrites B’s UI.

This is not just a memory issue.
It is a **race condition**.

## Weak version without cleanup

```jsx
useEffect(() => {
  async function fetchUser() {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  }

  fetchUser();
}, [userId]);
```

### Problem

Older request can finish after newer request and replace UI with stale data.

## Better version with `AbortController`

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function fetchUser() {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });

      const data = await res.json();
      setUser(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }

  fetchUser();

  return () => {
    controller.abort();
  };
}, [userId]);
```

### Why this is powerful

When `userId` changes or component unmounts:

* old request is aborted
* stale result is less likely to affect UI
* unnecessary work is canceled

MDN documents `AbortController` as the browser mechanism for canceling fetch-related async work, and modern React guidance strongly aligns with aborting or otherwise canceling async work when appropriate. ([MDN Web Docs][5])

---

# 9. Search box example: classic production case

Imagine a search bar where API requests fire on every keystroke.

## Wrong pattern

```jsx
useEffect(() => {
  fetch(`/api/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => setResults(data));
}, [query]);
```

### What goes wrong?

Typing:

* `r`
* `re`
* `rea`
* `react`

creates many overlapping requests.

Possible problems:

* old result finishes last
* UI shows stale results
* extra server load
* flickering states

## Better pattern

```jsx
useEffect(() => {
  if (!query) {
    setResults([]);
    return;
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(async () => {
    try {
      const res = await fetch(`/api/search?q=${query}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }, 400);

  return () => {
    clearTimeout(timeoutId);
    controller.abort();
  };
}, [query]);
```

### What cleanup is doing here

It cleans up **two different side effects**:

* `clearTimeout(timeoutId)` → stop pending debounce
* `controller.abort()` → cancel in-flight fetch

This is real-world senior-level cleanup.

---

# 10. WebSocket example

## Correct production structure

```jsx
useEffect(() => {
  const socket = new WebSocket("wss://example.com/live");

  socket.onopen = () => {
    console.log("Socket connected");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setMessages((prev) => [...prev, message]);
  };

  socket.onerror = (error) => {
    console.error("Socket error:", error);
  };

  return () => {
    socket.close();
  };
}, []);
```

### Why cleanup matters

If you do not close socket connections:

* server connections remain open
* component may keep receiving events
* duplicate sockets may exist after remount
* battery/network cost rises

This is exactly the kind of external synchronization `useEffect` was made for. ([React][2])

---

# 11. DOM library / third-party plugin example

Suppose you initialize a chart library, map, or video player.

## Example

```jsx
useEffect(() => {
  const chart = createChart(containerRef.current, data);

  return () => {
    chart.destroy();
  };
}, [data]);
```

### Why this matters

Third-party libraries often:

* attach DOM listeners
* allocate memory
* start animations
* register global handlers

If you fail to destroy them, you leak behavior, not just memory.

---

# 12. Scroll listener + stale closure trap

Cleanup is important, but it is not enough by itself.
You also need correct dependencies.

## Example with hidden bug

```jsx
useEffect(() => {
  function handleScroll() {
    if (isEnabled) {
      console.log("scroll tracked");
    }
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
```

### Problem

`isEnabled` is captured from the first render only.

If `isEnabled` changes later, listener may use stale value.

## Better

```jsx
useEffect(() => {
  function handleScroll() {
    if (isEnabled) {
      console.log("scroll tracked");
    }
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [isEnabled]);
```

Now cleanup removes the old listener and reattaches a fresh one with the latest state.

So cleanup and dependencies work together.

---

# 13. Why Strict Mode confuses people

A lot of developers say:

> “My effect is running twice.”

In development, Strict Mode intentionally runs an extra setup+cleanup cycle for effects to reveal bugs. React documents this behavior clearly. This is not React being broken; it is React stress-testing your effect logic. ([React][1])

## What React wants to prove

If your component does:

* setup
* cleanup
* setup again

then the app should still behave correctly.

If it breaks, your cleanup is incomplete.

## Example symptom

You open a page and see:

* double WebSocket connections
* duplicate logs
* event listeners firing twice

Usually that means:

* effect setup is not mirrored by cleanup
* or effect should not exist in the first place

---

# 14. The golden test for cleanup

Ask this:

> If this component mounts, updates, unmounts, then mounts again, will the outside world be left clean?

If the answer is no, cleanup is missing or incomplete.

---

# 15. Cases where cleanup is NOT needed

Not every effect needs cleanup.

## Example

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

This usually does not need cleanup because you are not:

* subscribing
* starting a process
* attaching a listener
* opening a connection
* scheduling work that outlives the render

React’s docs emphasize that many effects are unnecessary, and effects that merely derive values are often better replaced with direct render logic or memoization. ([React][2])

---

# 16. Cases where you probably should not use `useEffect` at all

This is advanced but important.

## Bad pattern

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);
```

This is usually unnecessary.

## Better

```jsx
const fullName = firstName + " " + lastName;
```

No effect. No cleanup. Cleaner logic.

React specifically warns that unnecessary effects create avoidable complexity and bugs. ([React][2])

---

# 17. Real-world use cases where cleanup is essential

These are highly practical.

## A. Auth/session listeners

Firebase auth, Supabase auth, custom auth providers

```jsx
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return unsubscribe;
}, []);
```

## B. Live collaboration

Google Docs-style editors, live cursors, multiplayer boards

```jsx
useEffect(() => {
  const channel = collaboration.connect(docId);

  channel.on("cursor-update", handleCursor);

  return () => {
    channel.off("cursor-update", handleCursor);
    channel.disconnect();
  };
}, [docId]);
```

## C. Media APIs

Camera, microphone, screen recording

```jsx
useEffect(() => {
  let stream;

  async function startCamera() {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  }

  startCamera();

  return () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}, []);
```

This is very real. Otherwise camera light may remain active.

## D. Geolocation tracking

```jsx
useEffect(() => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    setLocation(position.coords);
  });

  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
}, []);
```

## E. Animation loops

```jsx
useEffect(() => {
  let frameId;

  function animate() {
    updateParticles();
    frameId = requestAnimationFrame(animate);
  }

  frameId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(frameId);
}, []);
```

## F. Global keyboard shortcuts

```jsx
useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [closeModal]);
```

---

# 18. Advanced pattern: one cleanup for many resources

Sometimes one effect manages multiple external resources.

```jsx
useEffect(() => {
  const controller = new AbortController();

  function handleResize() {
    console.log("resize");
  }

  window.addEventListener("resize", handleResize, {
    signal: controller.signal,
  });

  fetch("/api/dashboard", { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((err) => {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    });

  return () => {
    controller.abort();
  };
}, []);
```

Modern DOM APIs allow using `AbortSignal` with more than fetch in some cases, including event listeners, which can simplify teardown patterns. MDN documents that listeners can be removed using an `AbortSignal` in supported APIs. ([MDN Web Docs][6])

This is a very clean production idea:

* one controller
* one abort
* multiple side effects cleaned together

---

# 19. Common mistakes in cleanup

## Mistake 1: forgetting dependency changes matter

People think cleanup only runs on unmount.

Wrong.

It also runs **before rerunning the effect** when dependencies change. ([React][1])

---

## Mistake 2: using anonymous listeners you can’t remove properly

Bad:

```jsx
useEffect(() => {
  window.addEventListener("resize", () => {
    console.log("resize");
  });

  return () => {
    window.removeEventListener("resize", () => {
      console.log("resize");
    });
  };
}, []);
```

This fails because the two arrow functions are different function objects.

Good:

```jsx
useEffect(() => {
  function handleResize() {
    console.log("resize");
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

MDN explicitly notes listener matching matters for removal. ([MDN Web Docs][4])

---

## Mistake 3: cleanup that does more than undo

Cleanup should not start new side effects.

Bad cleanup:

```jsx
return () => {
  fetch("/api/log-cleanup");
};
```

Cleanup is meant to undo the setup, not launch unrelated work.

---

## Mistake 4: using effects for derived state

This creates more re-renders and more lifecycle complexity than needed. React advises avoiding unnecessary effects. ([React][2])

---

## Mistake 5: ignoring race conditions

Even if no warning appears, old async work can still overwrite new UI. React 18 removing the old warning does not remove this risk. ([React][3])

---

# 20. A senior-level comparison: bad vs good mental models

## Weak mental model

“Cleanup is for memory leaks.”

## Better mental model

“Cleanup keeps external systems in sync with the current UI.”

That’s much stronger.

Because sometimes the biggest problem is not memory leak.
It is:

* stale requests
* duplicate subscriptions
* old room connection
* wrong search result
* double analytics listener
* lingering socket

---

# 21. Research / current guidance worth knowing

There is not one single “research paper” specifically famous for `useEffect` cleanup, but current authoritative guidance from the React team and browser platform docs gives several important conclusions:

## A. React wants effects to be symmetrical

Setup and cleanup should mirror each other. Strict Mode’s extra development cycle exists specifically to verify that symmetry. ([React][1])

## B. Many effects are unnecessary

React’s current docs strongly push developers to remove effects that merely compute values from props/state. This reduces bugs and cleanup burden. ([React][2])

## C. The old unmounted-state warning is gone in React 18+

That warning was removed because it was often misleading. Developers should focus on correctness of subscriptions and async cancellation, not on chasing a warning. ([React][3])

## D. Browser-native cancellation matters more now

`AbortController` is the modern primitive for canceling fetch and, in some APIs, coordinating broader resource cleanup. ([MDN Web Docs][5])

So the modern ecosystem direction is:

* fewer unnecessary effects
* more explicit cancellation
* more robust cleanup
* better Strict Mode resilience

---


---

# 23. Interview-ready definition

Here’s a strong answer:

> The cleanup function in `useEffect` is used to stop or undo side effects created by the effect. React runs it before rerunning the effect when dependencies change, and when the component unmounts. It is commonly used to remove event listeners, clear timers, unsubscribe from subscriptions, close sockets, and cancel async work like fetch requests. The main idea is that effect setup and cleanup should mirror each other so the component stays synchronized with external systems. ([React][1])

---

# 24. One perfect final example

This combines real-world patterns cleanly.

```jsx
import { useEffect, useState } from "react";

function LiveSearch({ query }) {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();

    setStatus("loading");

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal,
        });

        const data = await res.json();
        setResults(data);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error);
        setStatus("error");
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);   // clean debounce
      controller.abort();        // cancel in-flight request
    };
  }, [query]);

  return (
    <div>
      <p>Status: {status}</p>
      {results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### What this teaches

* effect only runs when needed
* cleanup handles both timer and request
* avoids stale responses
* avoids unnecessary work
* production-grade behavior

---

# 25. Final rules to remember

## Use cleanup when your effect:

* adds listeners
* starts timers
* opens connections
* subscribes to streams
* triggers async work that should be canceled
* allocates third-party resources

## Cleanup should:

* undo setup
* be minimal
* be symmetrical
* not create fresh side effects

## Avoid `useEffect` entirely when:

* you are deriving values from props/state
* you can compute during render
* you can use event handlers directly
* no external system is involved

---

# 26. One-line summary

`useEffect` cleanup is not just about avoiding memory leaks.
It is about making sure your component leaves **no stale side effects behind** when React updates or removes it.

If you want, I can turn this into a **classroom-ready teaching note with section headings, diagrams, and 5 progressively stronger demo components**.

[2]: https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com "You Might Not Need an Effect"
[3]: https://react.dev/blog/2022/03/08/react-18-upgrade-guide?utm_source=chatgpt.com "How to Upgrade to React 18"
[4]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener?utm_source=chatgpt.com "EventTarget: removeEventListener() method - Web APIs | MDN"
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management?utm_source=chatgpt.com "JavaScript resource management - MDN Web Docs"
[6]: https://developer.mozilla.org/de/docs/Web/API/EventTarget/removeEventListener?utm_source=chatgpt.com "EventTarget: Methode removeEventListener() - Web-APIs | MDN"
