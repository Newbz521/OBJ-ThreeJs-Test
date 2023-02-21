dat-gui-defaults
================

A useful wrapper of `dat.GUI <https://github.com/dataarts/dat.gui>`__ with defaults support.  The provided ``DatGuiDefaults`` class makes it easy to write a demo app that requires default configuration handling.

Setup
-----

**Installation**

.. code::
   
   $ npm install dat-gui-defaults

Usage
-----

1) First, subclass ``DatGuiDefaults`` and implement ``initGui(gui, data, params)``.
   For example, here we create ``DemoGui`` class.

.. code::

        class DemoGui extends DatGuiDefaults {
            // override
            initGui(gui, data, params) {
                //-------- begin sample --------
                let controller = gui.add(params, 'wireframe').name('Wireframe');
                controller.onChange((value) => {
                    data.wireframe = value;
                });
                controller = gui.add(params, 'reset').name("Restore Defaults");
                controller.onChange((value) => {
                    this.applyDefaults();         // API to restore defaults for dat.GUI
                    Object.assign(data, params);  // reflect the change in the app
                });
                //-------- end sample --------
            }
        }

2) Use the custom class with an application data object.

.. code::

        const data = {                // app data
            wireframe: true,
        };

        const dg = new DemoGui(data); // instantiate with data
        dg.setDefaults({              // defaults passed to dat.GUI
            wireframe: data.wireframe,
            reset: () => {},
        });
               
API
---

- **new DatGuiDefaults(data)**

  data (Object): app data object to be manipulated.

- **datGuiDefaults.setDefaults(params)**

  params (Object): the params object for dat.GUI.

  Set the default parameters.

- **datGuiDefaults.applyDefaults()**

  Restore the default parameters for dat.GUI.

- **datGuiDefaults.gui**

  The underlying dat.GUI object can be accessed this way.

**References**

`dat.GUI API documentation <https://github.com/dataarts/dat.gui/blob/master/API.md>`__


Demo
----

`Live demo <https://w3reality.github.io/dat-gui-defaults/examples/demo-script-tag/index.html>`__ (`examples/demo-script-tag/index.html <https://github.com/w3reality/dat-gui-defaults/blob/master/examples/demo-script-tag/index.html>`__)

.. image:: https://w3reality.github.io/dat-gui-defaults/examples/demo-highlight.png
..
   :target: https://w3reality.github.io/dat-gui-defaults/examples/demo-script-tag/dist/index.html
   :width: 640


Build
-----

.. code::

   $ npm install  # set up build tools
   $ npm run build
