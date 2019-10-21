$(function () {
	$('[data-toggle="tooltip"]').tooltip()
	$('[data-toggle="popover"]').popover()
	$('.carousel').carousel({
		interval: 3000
	})
	$('#modal_contacto').on('show.bs.modal',function(e){
		console.log('el modal contacto se está mostrando')
		$('#contacto_btn').removeClass('btn-success')
		$('#contacto_btn').addClass('btn-primary')
		$('#contacto_btn').prop('disabled','true')
	})
	$('#modal_contacto').on('shown.bs.modal',function(e){
		console.log('el modal contacto se mostró')
	})
	$('#modal_contacto').on('hide.bs.modal',function(e){
		console.log('el modal contacto se está ocultando')
		$('#contacto_btn').removeClass('btn-primary')
		$('#contacto_btn').addClass('btn-success')
		$('#contacto_btn').prop('disabled','')
	})
	$('#modal_contacto').on('hidden.bs.modal',function(e){
		console.log('el modal contacto se ocultó')
	})
})