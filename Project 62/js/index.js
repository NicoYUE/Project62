$(function() {
      var Accordion = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            // Event
            el.on('click', 'div[id^="cl_"]', {el: this.el, multiple: this.multiple}, this.dropdown)
      }
      
      Accordion.prototype.dropdown = function(e) {
      var $el = e.data.el;
  
      $this = $(this),
      $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
      
      if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            };
      
      /*Function 2: display the ligne of metro on the map
       *
       */
      var target_ligne = ($this.attr('id')).substring(1);
  
      // Determine if current line is visible
      var active = d3.select("#" + target_ligne).classed("active"),
      newOpacity = active ? 0 : 1;
      // Hide or show the elements
      d3.select("#" + target_ligne).style("opacity", newOpacity);
  
      d3.selectAll("path[name=s" + target_ligne + "]").style("opacity", newOpacity);
      // Update whether or not the elements are active
      d3.select("#" + target_ligne).classed("active", active = newOpacity);
      d3.selectAll("path[name=s" + target_ligne + "]").classed("active", active = newOpacity);
      
      }
      
      var accordion = new Accordion($('#accordion'), false);
  });