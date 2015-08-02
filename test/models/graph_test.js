var assert = require('assert');

var GraphModel = require('../../src/jsx/models/graph.jsx');

describe('GraphModel', function() {
  describe("recycling", function() {
    it('should create the same graph', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["m", "r"], ["q", "n"] ];
      graph1 = new GraphModel(nodes, edges);
      graph2 = new GraphModel(graph1.nodes(), graph1.edges());
      assert.deepEqual(graph1, graph2);
    });
  });

  describe('#clone', function() {
    it('should create the same graph', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["m", "r"], ["q", "n"] ];
      graph1 = new GraphModel(nodes, edges);
      graph2 = graph1.clone();
      assert.deepEqual(graph1, graph2);
    });
  });

  describe('#node', function() {
    it('should return a node that is in the graph', function() {
      node = { name: "n", data: "fooasdfbar" };
      graph = new GraphModel([node], []);
      assert.deepEqual(graph.node(node.name), node);
    });

    it('should not return internal metadata', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" }
      ];
      edges = [ ["n", "m"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.node(nodes[0].name), nodes[0]);
    });

    it('should return null if the node is not in the graph', function() {
      graph = new GraphModel([], []);
      assert.deepEqual(graph.node("fooasdfbar"), null);
    });
  });

  describe('#nodes', function() {
    it('should return empty if there are no nodes', function() {
      graph = new GraphModel([], []);
      assert.deepEqual(graph.nodes(), []);
    });

    it('should return all of the nodes', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" }
      ];
      edges = [ ["n", "m"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.nodes().filter(function(n) { return n.name == "n" })[0], nodes[0]);
      assert.deepEqual(graph.nodes().filter(function(n) { return n.name == "m" })[0], nodes[1]);
    });
  });

  describe('#edges', function() {
    it('should return empty if there are no edges', function() {
      graph = new GraphModel([], []);
      assert.deepEqual(graph.edges(), []);
    });

    it('should return all of the edges', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["m", "r"], ["q", "n"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.edges().filter(function(e) { return e[0] == "n" })[0], edges[0]);
      assert.deepEqual(graph.edges().filter(function(e) { return e[0] == "m" })[0], edges[1]);
      assert.deepEqual(graph.edges().filter(function(e) { return e[0] == "q" })[0], edges[2]);
    });
  });

  describe('#updateNode', function() {
    it('should do nothing if data is empty', function() {
      nodes = [ { name: "n", data: "fooasdfbar" } ];
      edges = [];
      graph = new GraphModel(nodes, edges);
      graph.updateNode("n", {});
      assert.deepEqual(graph.node("n"), nodes[0]);
    });

    it('should change an attribute', function() {
      nodes = [ { name: "n", data: "fooasdfbar" } ];
      edges = [];
      graph = new GraphModel(nodes, edges);
      graph.updateNode("n", { data: "barasdffoo" });
      assert.deepEqual(graph.node("n").data, "barasdffoo");
      assert.deepEqual(graph.node("n").name, "n");
    });
  });

  describe('#dfs', function() {
    it('should discover downstream nodes in a list', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["m", "q"], ["q", "r"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.dfs("m").sort(), nodes.slice(1,4).map(function(n) { return n.name; }));
    });

    it('should discover downstream nodes with branching', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["m", "q"], ["m", "r"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.dfs("m").sort(), nodes.slice(1,4).map(function(n) { return n.name; }));
    });
  });

  describe('#undirectedComponents', function() {
    it('should return no components from an empty graph', function() {
      nodes = [];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.undirectedComponents(), []);
    });

    it('should return a forest from a graph with no edges', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.undirectedComponents().sort(), nodes.map(function(n) { return [n.name]; }).sort());
    });

    it('should return separated components', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [ ["n", "m"], ["q", "r"] ];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.undirectedComponents().sort(), [ ["n", "m"], ["q", "r"] ]);
    })
  });

  describe('#forEachNode', function() {
    it('should return an empty array if there are no nodes in the graph', function() {
      nodes = [];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.forEachNode([], function(n) { return n; }), []);
    });

    it('should ignore nodes not in the graph', function() {
      nodes = [];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.forEachNode(["n", "m"], function(n) { return n; }), []);
    });

    it('should return an empty array if we don\'t pass any nodes', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.forEachNode([], function(n) { return n; }), []);
    });

    it('should return correct results', function() {
      nodes = [
        { name: "n", data: "fooasdfbar" },
        { name: "m", data: "barasdffoo" },
        { name: "q", data: "loremipsum" },
        { name: "r", data: "ipsumlorem" }
      ];
      edges = [];
      graph = new GraphModel(nodes, edges);
      assert.deepEqual(graph.forEachNode(["n", "m"], function(n) { return n; }).sort(), nodes.slice(0,2));
    });
  });
});